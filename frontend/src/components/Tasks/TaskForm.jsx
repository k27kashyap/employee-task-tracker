import React, { useEffect, useRef } from 'react';
import API from '../../api/axios';

export default function TaskForm({ mode='create', initialData={}, onCancel, onSaved }) {
  const [form, setForm] = React.useState({
    title: '', description: '', assignee: '', dueDate: '', priority: 'medium', status: 'todo'
  });
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const firstRef = useRef();

  useEffect(() => {
    API.get('/employees').then(r => setEmployees(r.data)).catch(()=>{});
    if (mode === 'edit' && initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        assignee: initialData.assignee?._id || initialData.assignee || '',
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
        priority: initialData.priority || 'medium',
        status: initialData.status || 'todo'
      });
    }
    setTimeout(()=> firstRef.current?.focus(), 40);
  }, [mode, initialData]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.assignee) { alert('Title and assignee required'); return; }
    setLoading(true);
    try {
      if (mode === 'create') {
        const res = await API.post('/tasks', form);
        onSaved(res.data);
      } else {
        const res = await API.put(`/tasks/${initialData._id}`, form);
        onSaved(res.data);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving task');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit}>
      <div style={{display:'grid', gap:10}}>
        <div>
          <label>Title</label>
          <input ref={firstRef} className="input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g., Design landing page" />
        </div>

        <div>
          <label>Description</label>
          <textarea className="input" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>

        <div style={{display:'flex', gap:10}}>
          <div style={{flex:1}}>
            <label>Assignee</label>
            <select className="input" value={form.assignee} onChange={e => setForm({...form, assignee: e.target.value})}>
              <option value="">Select assignee</option>
              {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
            </select>
          </div>

          <div style={{width:160}}>
            <label>Due date</label>
            <input type="date" className="input" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} />
          </div>
        </div>

        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <div style={{flex:1}}>
            <label>Priority</label>
            <select className="input" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>

          <div style={{width:160}}>
            <label>Status</label>
            <select className="input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="todo">todo</option>
              <option value="in-progress">in-progress</option>
              <option value="done">done</option>
            </select>
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:6}}>
          <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn primary">{loading ? 'Saving...' : (mode==='create' ? 'Create Task' : 'Save')}</button>
        </div>
      </div>
    </form>
  );
}
