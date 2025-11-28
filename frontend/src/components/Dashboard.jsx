import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from './ui/Layout';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/dashboard').then(r => setStats(r.data)).catch(console.error);
  }, []);

  if (!stats) return <Layout><div className="card">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="grid cols-3">
        <div className="card">
          <h3>Total Tasks</h3>
          <div style={{fontSize:28, fontWeight:800}}>{stats.totalTasks}</div>
          <div className="meta">All tasks across employees</div>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <div style={{fontSize:28, fontWeight:800, color:'var(--primary)'}}>{stats.doneTasks}</div>
          <div className="meta">Completion rate: {stats.completionRate}%</div>
        </div>

        <div className="card">
          <h3>Top assignees</h3>
          <ul style={{padding:0, listStyle:'none'}}>
            {stats.tasksPerEmployee.map(t => (
              <li key={t.employee} className="task-card" style={{marginBottom:8}}>
                <div className="task-avatar">{t.employee?.[0] || 'U'}</div>
                <div style={{marginLeft:10}}>
                  <div style={{fontWeight:700}}>{t.employee}</div>
                  <div className="kv">{t.count} tasks</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
