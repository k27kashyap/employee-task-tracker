const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();


// GET /employees
router.get('/', async (req, res, next) => {
try {
const employees = await Employee.find().lean();
res.json(employees);
} catch (err) { next(err); }
});


// POST /employees
router.post('/', async (req, res, next) => {
try {
const { name, email, role } = req.body;
const emp = new Employee({ name, email, role });
await emp.save();
res.status(201).json(emp);
} catch (err) { next(err); }
});


// GET /employees/:id
router.get('/:id', async (req, res, next) => {
try {
const emp = await Employee.findById(req.params.id);
if (!emp) return res.status(404).json({ message: 'Not found' });
res.json(emp);
} catch (err) { next(err); }
});


// PUT /employees/:id
router.put('/:id', async (req, res, next) => {
try {
const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!emp) return res.status(404).json({ message: 'Not found' });
res.json(emp);
} catch (err) { next(err); }
});


// DELETE /employees/:id
router.delete('/:id', async (req, res, next) => {
try {
await Employee.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) { next(err); }
});


module.exports = router;