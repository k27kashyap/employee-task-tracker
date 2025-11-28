import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import Modal from '../ui/Modal';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import Layout from '../ui/Layout';

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try { const res = await API.get('/tasks'); setTasks(res.data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const openCreate = () => { setEditTask(null); setModalOpen(true); };
  const openEdit = (task) => { setEditTask(task); setModalOpen(true); };

  const handleSaved = (saved) => {
    setTasks(prev => {
      const existing = prev.find(p => p._id === saved._id);
      if (existing) return prev.map(p => p._id === saved._id ? saved : p);
      return [saved, ...prev];
    });
    setModalOpen(false);
  };

  const handleToggle = async (task) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    setTasks(prev => prev.map(t => t._id === task._1d ? {...t, status: newStatus} : t));
    try { await API.put(`/tasks/${task._id}`, { status: newStatus }); }
    catch (err) { console.error(err); fetch(); }
  };

  const handleDelete = async (task) => {
    if (!confirm('Delete this task?')) return;
    try { await API.delete(`/tasks/${task._id}`); setTasks(prev => prev.filter(p => p._id !== task._id)); }
    catch (err) { alert('Delete failed'); console.error(err); }
  };

  return (
    <Layout>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <h2>Tasks</h2>
        <div style={{display:'flex', gap:8}}>
          <button className="btn ghost" onClick={fetch}>Refresh</button>
          <button className="btn primary" onClick={openCreate}>+ Add Task</button>
        </div>
      </div>

      {loading ? <div className="card">Loading tasks…</div> : (
        <div className="task-list">
          {tasks.length === 0 && <div className="card">No tasks yet — click Add Task to create one.</div>}
          {tasks.map(t => (
            <TaskCard key={t._id} task={t} onEdit={openEdit} onToggleStatus={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTask ? 'Edit Task' : 'New Task'}>
        <TaskForm mode={editTask ? 'edit' : 'create'} initialData={editTask} onCancel={() => setModalOpen(false)} onSaved={handleSaved} />
      </Modal>
    </Layout>
  );
}
