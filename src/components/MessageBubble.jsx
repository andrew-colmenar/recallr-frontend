import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ sender, text }) => {
  return (
    <div className={`message-bubble message-${sender}`}>
      {text}
    </div>
  );
};

export default MessageBubble; 