import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import ChatSidebar from './components/playground/ChatSidebar';
import ChatWindow from './components/playground/ChatWindow';
import MemoryPanel from './components/playground/MemoryPanel';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import ApiKeysPage from './pages/ApiKeysPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/variables.css';
import './App.css';

// This component will contain the layout for the Playground
const PlaygroundLayout = () => {
  const defaultChats = [
    {
      id: 1,
      name: 'Chat 1',
      messages: [
        { sender: 'assistant', text: 'Hello! How can I help you today?' }
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';
  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="requests" element={<div>Requests Page</div>} />
          <Route path="memories" element={<div>Memories Page</div>} />
          <Route path="graph-memory" element={<div>Graph Memory Page</div>} />
          <Route path="users" element={<div>Users Page</div>} />
          <Route path="api-keys" element={<ApiKeysPage />} />
          <Route path="webhooks" element={<div>Webhooks Page</div>} />
          <Route path="exports" element={<div>Memory Exports Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="usage" element={<div>Usage Page</div>} />
          <Route path="subscriptions" element={<div>Subscriptions Page</div>} />
          <Route path="forum" element={<div>Forum Page</div>} />
          <Route path="status" element={<div>Status Page</div>} />
          <Route path="support" element={<div>Help / Support Page</div>} />
        </Route>
        <Route path="/playground" element={<PlaygroundLayout />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
