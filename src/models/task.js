const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const taskSchema = new mongoose.Schema({
	Plan_Type: {
		type: String,
		trime: true,
	},
	Company_Name: {
		type: String,
		trime: true,
	},
	Emp_Mobile_No: {
		type: Number,
		trime: true,
	},
	Emp_Code: {
		type: String,
		trime: true,
	},
	Work_Email: {
		type: String,
		trime: true,
	},
	Grade_Card: {
		type: String,
		trime: true,
	},
	Emp_Type: {
		type: String,
		trime: true,
	},
	Emp_Name: {
		type: String,
		trime: true,
	},
	Designation: {
		type: String,
		trime: true,
	},
	Work_Loaction: {
		type: String,
		trime: true,
	},
	DOJ: {
		type: Date,
		trime: true,
	},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
