const express = require('express');
const UserRouter = require('./routers/userRouter');
const TaskRouter = require('./routers/taskRouter');
const app = express();
require('./db/mongoose');
let cors = require('cors');

const port = process.env.PORT || 4000;
app.use(cors());

app.get('/test', function (req, res) {
	res.send('Hello world!');
});

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

app.listen(port, () => {
	//console.log('Server is running on ', port);
});
