import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiUserLine, RiLogoutBoxLine, RiKeyLine, RiVipCrownLine, RiCustomerService2Line } from 'react-icons/ri';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logout clicked');
  };

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
        <div className="user-menu" ref={userMenuRef}>
          <button 
            className="user-menu-button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <RiUserLine size={24} />
          </button>
          {isUserMenuOpen && (
            <div className="user-dropdown">
              <div className="user-welcome">
                <span>Welcome, User</span>
              </div>
              <div className="dropdown-divider"></div>
              <Link to="/dashboard/api-keys" className="dropdown-item">
                <RiKeyLine size={20} />
                <span>API Keys</span>
              </Link>
              <Link to="/dashboard/subscriptions" className="dropdown-item">
                <RiVipCrownLine size={20} />
                <span>Subscriptions</span>
              </Link>
              <Link to="/dashboard/support" className="dropdown-item">
                <RiCustomerService2Line size={20} />
                <span>Help & Support</span>
              </Link>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item logout">
                <RiLogoutBoxLine size={20} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 