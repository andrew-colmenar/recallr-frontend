import React, { useState } from 'react';
import './ApiKeysPage.css';

const ApiKeysPage = () => {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Dev Key',
      key: 'sk_live_1234567890abcdef',
      createdAt: '2024-03-20T10:00:00Z'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [copySuccess, setCopySuccess] = useState(null);

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString()
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setIsModalOpen(false);
  };

  const handleDeleteClick = (key) => {
    setKeyToDelete(key);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (keyToDelete) {
      setApiKeys(apiKeys.filter(key => key.id !== keyToDelete.id));
      setDeleteModalOpen(false);
      setKeyToDelete(null);
    }
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopySuccess(key);
      setTimeout(() => setCopySuccess(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="api-keys-container">
      <h1 className="api-keys-header">API Keys</h1>
      <p className="api-keys-intro">
        Manage your API keys here. Create new keys, view existing ones, and delete keys you no longer need.
      </p>
      
      <div className="api-keys-table">
        <div className="table-header">
          <div className="header-cell">Name</div>
          <div className="header-cell">API Key</div>
          <div className="header-cell">Created At</div>
          <div className="header-cell">Actions</div>
        </div>
        <div className="table-body">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="table-row">
              <div className="cell">{apiKey.name}</div>
              <div className="cell key-value">
                {visibleKeys.has(apiKey.id) ? (
                  <span className="visible-key">{apiKey.key}</span>
                ) : (
                  <span className="masked-key">••••••••{apiKey.key.slice(-4)}</span>
                )}
              </div>
              <div className="cell">{new Date(apiKey.createdAt).toLocaleDateString()}</div>
              <div className="cell actions">
                <button 
                  className="action-button"
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                >
                  {visibleKeys.has(apiKey.id) ? 'Hide' : 'Show'}
                </button>
                <button 
                  className={`action-button ${copySuccess === apiKey.key ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(apiKey.key)}
                >
                  {copySuccess === apiKey.key ? 'Copied!' : 'Copy'}
                </button>
                <button 
                  className="action-button delete"
                  onClick={() => handleDeleteClick(apiKey)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="create-key-section">
        <button 
          className="create-key-button"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Key
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New API Key</h2>
            <div className="modal-content">
              <label htmlFor="keyName">Key Name</label>
              <input
                type="text"
                id="keyName"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Enter a name for your API key"
              />
            </div>
            <div className="modal-actions">
              <button 
                className="modal-button cancel"
                onClick={() => {
                  setIsModalOpen(false);
                  setNewKeyName('');
                }}
              >
                Cancel
              </button>
              <button 
                className="modal-button create"
                onClick={handleCreateKey}
              >
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && keyToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete API Key</h2>
            <div className="modal-content">
              <p className="delete-warning">
                Are you sure you want to delete the API key "{keyToDelete.name}"? This action cannot be undone.
              </p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-button cancel"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setKeyToDelete(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="modal-button delete"
                onClick={handleConfirmDelete}
              >
                Delete Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeysPage; 