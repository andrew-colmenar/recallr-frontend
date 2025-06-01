import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';
import MemoriesPanel from '../components/MemoriesPanel';
import './Playground.css';

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

const Playground = () => {
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
    <div className="playground-root">
      <Navbar />
      <div className="playground-main">
        <Sidebar
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          onNewChat={handleNewChat}
        />
        <div className="playground-chat-container">
          <Chat
            messages={selectedChat ? selectedChat.messages : []}
            onSendMessage={handleSendMessage}
          />
        </div>
        <MemoriesPanel />
      </div>
    </div>
  );
};

export default Playground; 