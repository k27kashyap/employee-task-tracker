import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from './ui/Layout';

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get('/employees').then(r => setEmployees(r.data)).catch(console.error);
  }, []);

  return (
    <Layout>
      <div className="grid cols-2">
        {employees.map(emp => (
          <div key={emp._id} className="card">
            <h3>{emp.name}</h3>
            <div className="meta">{emp.email}</div>
            <div className="kv" style={{marginTop:8}}>Role: {emp.role}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
