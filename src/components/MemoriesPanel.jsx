import React from 'react';
import './MemoriesPanel.css';

const MemoriesPanel = () => {
  return (
    <div className="memories-panel-container">
      {/* Placeholder content for the right memories panel */}
      <div className="panel-header">
        <h4>Your Memories (0)</h4>
        <div className="panel-actions">
          <span>🔄</span> {/* Refresh icon */}
          <span>🗑️</span> {/* Delete icon */}
        </div>
      </div>
      <div className="panel-content">
        <p>No memories found.</p>
        <p>Your memories will appear here.</p>
        <button className="refresh-btn">Refresh</button>
      </div>
    </div>
  );
};

export default MemoriesPanel; 