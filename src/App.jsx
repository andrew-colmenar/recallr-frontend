import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import MemoryPanel from './components/MemoryPanel';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

// This component will contain the layout for the Playground
const PlaygroundLayout = () => {
  const defaultChats = [
    {
      id: 1,
      name: 'Chat 1',
      messages: [
        { sender: 'assistant', text: 'Hello! How can I help you today?' },
        { sender: 'user', text: 'Tell me about Recallr AI.' },
      ]
    }
  ];
  const [chats, setChats] = useState(defaultChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

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

  const handleSendMessage = (messageText) => {
    if (messageText.trim() === '') return;
    setChats(chats.map(chat =>
      chat.id === selectedChatId
        ? { ...chat, messages: [...chat.messages, { sender: 'user', text: messageText }] }
        : chat
    ));
  };

  return (
    <div className="main-content">
      <ChatSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        onNewChat={handleNewChat}
      />
      <ChatWindow
        messages={selectedChat ? selectedChat.messages : []}
        onSendMessage={handleSendMessage}
      />
      <MemoryPanel />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<PlaygroundLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
