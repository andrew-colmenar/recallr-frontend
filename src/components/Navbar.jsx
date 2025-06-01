import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <img src={logo} alt="Recallr AI Logo" className="logo" />
        <span>Recallr AI</span>
      </div>
      <div className="navbar-right">
        <a href="#">Dashboard</a>
        <a href="#">Playground</a>
        <a href="#">Docs</a>
      </div>
    </nav>
  );
};

export default Navbar; 