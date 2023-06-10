const express = require('express');
const task = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const Task = require('../models/task');
const csv = require('csvtojson');
const { auth } = require('../middleware/auth');

task.use(bodyParser.urlencoded({ extended: true }));
// task.use(express.static(path.resolve(__dirname, 'public')));

task.set('view engine', 'ejs');
task.set('views', path.join(__dirname, 'views'));
task.use(express.static(`${__dirname}/public`));

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../public/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

let upload = multer({ storage: multerStorage });

task.post('/importCSV', upload.single('file'), async (req, res) => {
	try {
		let taskList = [];
		csv()
			.fromFile(req.file.path)
			.then(async (response) => {
				response.map((response) => {
					return taskList.push({
						Plan_Type: response?.topup_plan_type,
						Company_Name: response?.company_name,
						Emp_Mobile_No: response?.employee_mobile_no,
						Emp_Code: response?.employee_code,
						Work_Email: response?.work_email,
						Grade_Card: response?.grade_carde,
						Emp_Type: response?.employee_type,
						Emp_Name: response?.employee_name,
						Designation: response?.designation,
						Work_Loaction: response?.work_location,
						DOJ: response?.doj_organization,
					});
				});
				const dataList = await Task.insertMany(taskList);
			});

		res.status(200).send({ msg: 'csv file uploaded' });
	} catch (error) {
		res.status(400).send(error);
	}
});

task.get('/getTask', auth, async (req, res) => {
	let details = await Task.find({});
	res.send(details);
});

module.exports = task;
