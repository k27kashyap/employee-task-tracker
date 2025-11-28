import React from 'react';

export default function TaskCard({ task, onEdit, onToggleStatus, onDelete }) {
  const statusCls = task.status === 'done' ? 'badge done' : task.status === 'in-progress' ? 'badge in-progress' : 'badge todo';
  return (
    <div className="task-card">
      <div className="task-avatar">{task.assignee?.name?.[0] || 'U'}</div>
      <div style={{flex:1}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:10}}>
          <div>
            <div style={{fontWeight:800}}>{task.title}</div>
            <div className="meta" style={{marginTop:4}}>{task.assignee?.name || 'Unassigned'} • {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due'}</div>
          </div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <div className={statusCls} style={{minWidth:72, textAlign:'center'}}>{task.status}</div>
            <button className="btn small" onClick={() => onToggleStatus(task)}>{task.status === 'done' ? 'Mark todo' : 'Mark done'}</button>
            <button className="btn small" onClick={() => onEdit(task)} style={{background:'transparent', color:'var(--muted)'}}>Edit</button>
            <button className="btn small" onClick={() => onDelete(task)} style={{background:'transparent', color:'var(--muted)'}}>Delete</button>
          </div>
        </div>
        {task.description && <div style={{marginTop:8, color:'var(--muted)'}}>{task.description}</div>}
      </div>
    </div>
  );
}
