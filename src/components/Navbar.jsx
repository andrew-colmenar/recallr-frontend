import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      {/* Placeholder for logo and navigation links */}
      <span>Recallr AI</span>
      <div>
        <a href="#">Dashboard</a>
        <a href="#">Playground</a>
        <a href="#">Docs</a>
      </div>
    </nav>
  );
};

export default Navbar; 