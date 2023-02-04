import React from 'react';
import './App.css';
import UserComponent from './components/User';
import ConversationComponent from './components/Conversation';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useNavigate } from 'react-router-dom';

function App() {
  const userId = useSelector((state: RootState) => state.usersLocalSlice.selectedUserId);
  const conversationId = useSelector((state: RootState) => state.conversationLocalSlice.selectedConversationId);
  const location = useNavigate();

  const handleProceed = (): void => {
    location('/chat-room');
  };

  return (
    <div className='App'>
      <div className='header-app'>
        <h3>Vonage Chat App</h3>
      </div>
      <UserComponent />
      <ConversationComponent />
      {userId && conversationId && (
        <Button onClick={handleProceed} variant='outlined'>
          Login
        </Button>
      )}
    </div>
  );
}

export default App;
