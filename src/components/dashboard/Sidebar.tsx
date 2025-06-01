import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Get Started', path: '/dashboard' },
  { name: 'Requests', path: '/dashboard/requests' },
  { name: 'Memories', path: '/dashboard/memories' },
  { name: 'Graph Memory', path: '/dashboard/graph-memory' },
  { name: 'Users', path: '/dashboard/users' },
  { name: 'API Keys', path: '/dashboard/api-keys' },
  { name: 'Webhooks', path: '/dashboard/webhooks' },
  { name: 'Memory Exports', path: '/dashboard/exports' },
  { name: 'Settings', path: '/dashboard/settings' },
  { name: 'Usage', path: '/dashboard/usage' },
  { name: 'Subscriptions', path: '/dashboard/subscriptions' },
  { name: 'Forum', path: '/dashboard/forum' },
  { name: 'Status', path: '/dashboard/status' },
  { name: 'Help / Support', path: '/dashboard/support' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <div className="sidebar-nav-container">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.name} className="nav-item">
                <button
                  onClick={() => navigate(item.path)}
                  className={`nav-button ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </button>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 