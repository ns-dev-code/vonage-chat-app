import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import ChatRoom from './components/ChatRoom';

const RouteConfig = () => {
  return (
    <Routes>
      <Route element={<App />} path='' />
      <Route path='/chat-room' element={<ChatRoom />} />
    </Routes>
  );
};

export default RouteConfig;
