import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
      <footer className="footer">Khushi Kashyap ♥</footer>
    </div>
  );
}
