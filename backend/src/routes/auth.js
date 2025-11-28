const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const router = express.Router();


// POST /auth/register
router.post('/register', async (req, res, next) => {
try {
const { email, password, name } = req.body;
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Already exists' });
const emp = new Employee({ name, email });
await emp.save();
const pwHash = await bcrypt.hash(password, 10);
const user = new User({ email, passwordHash: pwHash, employee: emp._id, role: 'user' });
await user.save();
res.status(201).json({ message: 'Registered' });
} catch (err) { next(err); }
});


// POST /auth/login
router.post('/login', async (req, res, next) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email }).populate('employee');
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const match = await bcrypt.compare(password, user.passwordHash);
if (!match) return res.status(400).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id, role: user.role, employeeId: user.employee._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
res.json({ token, user: { email: user.email, role: user.role, employee: user.employee } });
} catch (err) { next(err); }
});


module.exports = router;