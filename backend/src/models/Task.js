// src/models/Task.js (example)
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
  dueDate: Date,
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  status: { type: String, enum: ['todo','in-progress','done'], default: 'todo' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
