import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <img src={logo} alt="Recallr AI Logo" className="logo" />
        <span>Recallr AI</span>
      </div>
      <div className="navbar-right">
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          Dashboard
        </Link>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Playground
        </Link>
        <a href="https://app.recallrai.com/api/docs" target="_blank" rel="noopener noreferrer">
          Docs
        </a>
      </div>
    </nav>
  );
};

export default Navbar; 