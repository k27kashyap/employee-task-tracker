const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
title: { type: String, required: true },
description: String,
status: { type: String, enum: ['todo','in-progress','done'], default: 'todo' },
assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
dueDate: Date,
priority: { type: String, enum: ['low','medium','high'], default: 'medium' }
}, { timestamps: true });


module.exports = mongoose.model('Task', TaskSchema);