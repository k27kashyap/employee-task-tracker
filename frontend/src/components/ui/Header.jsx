import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const loc = useLocation();
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">ETT</div>
        <h1>Employee Tasks Manager</h1>
      </div>

      <nav className="nav" aria-label="Main navigation">
        <Link className={loc.pathname === '/' ? 'active' : ''} to="/">Dashboard</Link>
        <Link className={loc.pathname.startsWith('/employees') ? 'active' : ''} to="/employees">Employees</Link>
        <Link className={loc.pathname.startsWith('/tasks') ? 'active' : ''} to="/tasks">Tasks</Link>
        {/* <Link to="/tasks" className="btn small" style={{padding:'6px 10px'}}>View Tasks</Link> */}
      </nav>
    </header>
  );
}
