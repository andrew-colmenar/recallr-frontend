import React from 'react';
import './ChatSidebar.css';

const ChatSidebar = ({ chats, selectedChatId, onSelectChat, onNewChat }) => {
  return (
    <div className="chat-sidebar-container">
      <div className="sidebar-header">
        <span>Chats</span>
        <button className="new-chat-button" onClick={onNewChat}>+ New Chat</button>
      </div>
      {/* Render actual chat list from props */}
      <ul className="chat-list">
        {chats.map(chat => (
          <li
            key={chat.id}
            className={`chat-list-item ${chat.id === selectedChatId ? 'selected' : ''}`}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar; 