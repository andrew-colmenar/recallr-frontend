import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === 'user';

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-content">
        {text}
      </div>
    </div>
  );
};

export default MessageBubble; 