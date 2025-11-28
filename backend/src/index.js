require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeesRoute = require('./routes/employee');
const tasksRoute = require('./routes/task');
const authRoute = require('./routes/auth'); // optional
const errorHandler = require('./middleware/errorHandler');


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/smarttracker');


// routes
app.use('/api/employees', employeesRoute);
app.use('/api/tasks', tasksRoute);
app.use('/api/auth', authRoute);


// simple dashboard endpoint
app.get('/api/dashboard', async (req, res, next) => {
try {
const Task = require('./models/Task');
const Employee = require('./models/Employee');


const totalTasks = await Task.countDocuments();
const doneTasks = await Task.countDocuments({ status: 'done' });
const completionRate = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);


// tasks per employee
const agg = await Task.aggregate([
{ $group: { _id: '$assignee', count: { $sum: 1 } } }
]);
// populate employee names
const enriched = await Promise.all(agg.map(async g => {
const emp = await Employee.findById(g._id).lean();
return { employee: emp ? emp.name : 'Unknown', count: g.count };
}));


res.json({ totalTasks, doneTasks, completionRate, tasksPerEmployee: enriched });
} catch (err) {
next(err);
}
});


app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));