import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import MemoryPanel from './components/MemoryPanel';
import './App.css';

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

function App() {
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
    <div className="app-container">
      <Navbar />
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
    </div>
  );
}

export default App;
