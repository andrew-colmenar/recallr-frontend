import React from 'react';
import './Sidebar.css';

const Sidebar = ({ chats, selectedChatId, onSelectChat, onNewChat }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <span>Chats</span>
        <button className="new-chat-btn" onClick={onNewChat}>+ New Chat</button>
      </div>
      {/* Replace placeholder with chat list */} 
      <ul className="chat-list">
        {chats.map(chat => (
          <li
            key={chat.id}
            className={`chat-list-item${chat.id === selectedChatId ? ' selected' : ''}`}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
      {/* Placeholder for Memories List header/content if you want to combine */}
      {/* <h3>Yesterday</h3> */}
      {/* ... memory items here ... */}
    </div>
  );
};

export default Sidebar; 