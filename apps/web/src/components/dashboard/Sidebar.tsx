import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  RiHome4Line,
  RiListCheck2,
  RiBrainLine,
  RiGitBranchLine,
  RiUserLine,
  RiKeyLine,
  RiWebhookLine,
  RiDownloadLine,
  RiSettings4Line,
  RiBarChartLine,
  RiVipCrownLine,
  RiQuestionAnswerLine,
  RiSignalTowerLine,
  RiCustomerService2Line
} from 'react-icons/ri';
import './Sidebar.css';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Get Started', path: '/dashboard', icon: <RiHome4Line size={20} /> },
  { name: 'Requests', path: '/dashboard/requests', icon: <RiListCheck2 size={20} /> },
  { name: 'Memories', path: '/dashboard/memories', icon: <RiBrainLine size={20} /> },
  { name: 'Graph Memory', path: '/dashboard/graph-memory', icon: <RiGitBranchLine size={20} /> },
  { name: 'Users', path: '/dashboard/users', icon: <RiUserLine size={20} /> },
  { name: 'API Keys', path: '/dashboard/api-keys', icon: <RiKeyLine size={20} /> },
  { name: 'Webhooks', path: '/dashboard/webhooks', icon: <RiWebhookLine size={20} /> },
  { name: 'Memory Exports', path: '/dashboard/exports', icon: <RiDownloadLine size={20} /> },
  { name: 'Settings', path: '/dashboard/settings', icon: <RiSettings4Line size={20} /> },
  { name: 'Usage', path: '/dashboard/usage', icon: <RiBarChartLine size={20} /> },
  { name: 'Subscriptions', path: '/dashboard/subscriptions', icon: <RiVipCrownLine size={20} /> },
  { name: 'Forum', path: '/dashboard/forum', icon: <RiQuestionAnswerLine size={20} /> },
  { name: 'Status', path: '/dashboard/status', icon: <RiSignalTowerLine size={20} /> },
  { name: 'Help / Support', path: '/dashboard/support', icon: <RiCustomerService2Line size={20} /> },
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
                  <span className="nav-icon">{item.icon}</span>
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