import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const messagesAdapter = createEntityAdapter({});
const initialState = messagesAdapter.getInitialState({
  messages: [
    {
      text: '',
      time: '',
      sender: '',
      id: '',
      key: '',
      userId: '',
      conversationId: '',
    },
  ],
});

export const messagesLocalSlice = createSlice({
  name: 'messagesLocalSlice',
  initialState,
  reducers: {
    saveMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  selectAll: selectAllMessages,
  selectById,
  selectEntities,
} = messagesAdapter.getSelectors((state) => state['usersLocalSlice'] ?? initialState);

export const loadMessagesByConversationId = (state: RootState) => {
  return state.messagesLocalSlice.messages.filter(
    (message) => message.conversationId === state.conversationLocalSlice.selectedConversationId,
  );
};
export const { saveMessages } = messagesLocalSlice.actions;
