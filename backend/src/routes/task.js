// src/routes/task.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import models - adjust paths/casing if your files differ
const Task = require('../models/Task');
const Employee = require('../models/Employee'); // optional - used for validation/populate

// GET /api/tasks
// Optional query params: status, assignee, q (text search)
router.get('/', async (req, res, next) => {
  try {
    const { status, assignee, q } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (assignee) {
      // allow either id or name-ish match if needed
      if (mongoose.Types.ObjectId.isValid(assignee)) filter.assignee = assignee;
    }
    if (q) {
      // If you have text index set up on title/description, use $text
      // Otherwise fallback to simple regex search:
      const regex = new RegExp(q, 'i');
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const tasks = await Task.find(filter)
      .populate('assignee', 'name email role')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid task id' });

    const task = await Task.findById(id).populate('assignee', 'name email role');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const { title, description, assignee, dueDate, priority, status } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    // if assignee provided, ensure exists (optional)
    if (assignee && !mongoose.Types.ObjectId.isValid(assignee)) {
      return res.status(400).json({ message: 'Invalid assignee id' });
    }
    if (assignee) {
      const emp = await Employee.findById(assignee);
      if (!emp) return res.status(400).json({ message: 'Assignee not found' });
    }

    const newTask = new Task({
      title,
      description,
      assignee: assignee || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority || 'medium',
      status: status || 'todo'
    });

    const saved = await newTask.save();
    const populated = await saved.populate('assignee', 'name email role').execPopulate?.() || await Task.findById(saved._id).populate('assignee', 'name email role');

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid task id' });

    const updates = {};
    const allowed = ['title', 'description', 'assignee', 'dueDate', 'priority', 'status'];
    allowed.forEach(key => {
      if (key in req.body) updates[key] = req.body[key];
    });

    if (updates.assignee && !mongoose.Types.ObjectId.isValid(updates.assignee)) {
      return res.status(400).json({ message: 'Invalid assignee id' });
    }
    if (updates.assignee) {
      const emp = await Employee.findById(updates.assignee);
      if (!emp) return res.status(400).json({ message: 'Assignee not found' });
    }

    if (updates.dueDate) updates.dueDate = new Date(updates.dueDate);

    const task = await Task.findByIdAndUpdate(id, updates, { new: true }).populate('assignee', 'name email role');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid task id' });

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted', id: task._id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
