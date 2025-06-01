import React, { useState } from 'react';
import './Chat.css';

const AVATARS = {
  assistant: '🟢', // Placeholder for assistant avatar (could be replaced with an image)
  user: '🟣',      // Placeholder for user avatar (could be replaced with an image)
};

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'What can I help you with?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
  };

  return (
    <div className="chat-outer-container">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
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
  );
};

export default Chat; 