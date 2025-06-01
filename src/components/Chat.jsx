import React, { useState } from 'react';
import './Chat.css';

const AVATARS = {
  assistant: '🟢', // Placeholder for assistant avatar (could be replaced with an image)
  user: '🟣',      // Placeholder for user avatar (could be replaced with an image)
};

const defaultChats = [
  {
    id: 1,
    name: 'Chat 1',
    messages: [
      { sender: 'assistant', text: 'What can I help you with?' }
    ]
  },
  {
    id: 2,
    name: 'Chat 2',
    messages: [
      { sender: 'assistant', text: 'Welcome to Chat 2!' }
    ]
  }
];

const Chat = () => {
  const [chats, setChats] = useState(defaultChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [input, setInput] = useState('');

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setChats(chats.map(chat =>
      chat.id === selectedChatId
        ? { ...chat, messages: [...chat.messages, { sender: 'user', text: input }] }
        : chat
    ));
    setInput('');
  };

  const handleNewChat = () => {
    const newId = chats.length ? Math.max(...chats.map(c => c.id)) + 1 : 1;
    const newChat = {
      id: newId,
      name: `Chat ${newId}`,
      messages: [
        { sender: 'assistant', text: 'What can I help you with?' }
      ]
    };
    setChats([...chats, newChat]);
    setSelectedChatId(newId);
  };

  return (
    <div className="multi-chat-outer">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <span>Chats</span>
          <button className="new-chat-btn" onClick={handleNewChat}>+ New Chat</button>
        </div>
        <ul className="chat-list">
          {chats.map(chat => (
            <li
              key={chat.id}
              className={`chat-list-item${chat.id === selectedChatId ? ' selected' : ''}`}
              onClick={() => setSelectedChatId(chat.id)}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-outer-container">
        <div className="chat-container">
          <div className="chat-messages">
            {selectedChat.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message-row ${msg.sender}`}
              >
                {msg.sender === 'assistant' && (
                  <span className="chat-avatar">{AVATARS.assistant}</span>
                )}
                <div className={`chat-message-bubble ${msg.sender}`}>{msg.text}</div>
                {msg.sender === 'user' && (
                  <span className="chat-avatar">{AVATARS.user}</span>
                )}
              </div>
            ))}
          </div>
          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              className="chat-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="chat-send-btn" type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat; 