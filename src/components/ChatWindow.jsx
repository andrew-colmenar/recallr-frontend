import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import './ChatWindow.css';

// Receive messages and onSendMessage from props
const ChatWindow = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input); // Call the handler passed from App.jsx
      setInput(''); // Clear input after sending
    }
  };

  // Suggestion button logic remains the same for now
  const handleSuggestionClick = (text) => {
    setInput(text);
    // Decide if clicking suggestion auto-sends or just fills input
    // onSendMessage(text); // Uncomment to auto-send suggestion
  };

  const suggestionButtons = ['My name', 'Travel', 'Food', 'Allergies', 'Project Details'];

  return (
    <div className="chat-window-container">
      <div className="chat-messages">
        {/* Render messages received from props */}
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      {/* Suggestion buttons */} 
      <div className="suggestion-buttons">
        {suggestionButtons.map((text, idx) => (
          <button
            key={idx}
            className="suggestion-btn"
            onClick={() => handleSuggestionClick(text)}
          >
            {text}
          </button>
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow; 