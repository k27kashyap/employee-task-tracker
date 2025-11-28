import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeesList from './components/EmployeesList';
import TasksList from './components/Tasks/TasksList';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employees" element={<EmployeesList />} />
      <Route path="/tasks" element={<TasksList />} />
    </Routes>
  );
}
