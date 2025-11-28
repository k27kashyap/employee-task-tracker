const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();


// GET /tasks?status=&assignee=
router.get('/', async (req, res, next) => {
try {
const filter = {};
if (req.query.status) filter.status = req.query.status;
if (req.query.assignee) filter.assignee = req.query.assignee;
const tasks = await Task.find(filter).populate('assignee').lean();
res.json(tasks);
} catch (err) { next(err); }
});


// POST /tasks
router.post('/', async (req, res, next) => {
try {
const { title, description, assignee, dueDate, priority } = req.body;
const emp = await Employee.findById(assignee);
if (!emp) return res.status(400).json({ message: 'Invalid assignee' });
const task = new Task({ title, description, assignee, dueDate, priority });
await task.save();
res.status(201).json(task);
} catch (err) { next(err); }
});


// GET /tasks/:id
router.get('/:id', async (req, res, next) => {
try {
const task = await Task.findById(req.params.id).populate('assignee');
if (!task) return res.status(404).json({ message: 'Not found' });
res.json(task);
} catch (err) { next(err); }
});


// PUT /tasks/:id
router.put('/:id', async (req, res, next) => {
try {
const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignee');
if (!task) return res.status(404).json({ message: 'Not found' });
res.json(task);
} catch (err) { next(err); }
});


// DELETE /tasks/:id
router.delete('/:id', async (req, res, next) => {
try {
await Task.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) { next(err); }
});


module.exports = router;