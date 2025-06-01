import React from 'react';
import './MemoryPanel.css';

const MemoryPanel = () => {
  return (
    <div className="memory-panel-container">
      <h4>Your Memories</h4>
      <p>No memories found.</p>
      <button className="refresh-button">Refresh</button>
    </div>
  );
};

export default MemoryPanel; 