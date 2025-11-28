// src/routes/dashboard.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/Task');
const Employee = require('../models/Employee');

router.get('/', async (req, res, next) => {
  try {
    // basic totals
    const totalTasks = await Task.countDocuments();
    const doneTasks = await Task.countDocuments({ status: 'done' });
    const completionRate = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

    // tasks per employee (including unassigned)
    const agg = await Task.aggregate([
      {
        $group: {
          _id: '$assignee',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // map to names
    const tasksPerEmployee = [];
    for (const item of agg) {
      if (!item._id) {
        tasksPerEmployee.push({ employee: 'Unassigned', count: item.count });
        continue;
      }
      const emp = await Employee.findById(item._id).select('name');
      tasksPerEmployee.push({ employee: emp ? emp.name : 'Unknown', count: item.count });
    }

    res.json({
      totalTasks,
      doneTasks,
      completionRate,
      tasksPerEmployee
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
