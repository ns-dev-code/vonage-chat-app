import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  ConversationApiDto,
  GetConversationByIdApiResponse,
  GetConversationsApiResponse,
  enhancedApi,
} from './coversationsSlice';

const conversationsAdapter = createEntityAdapter<ConversationApiDto>({});
const initialState = { ...conversationsAdapter.getInitialState(), selectedConversationId: '' };

export const conversationsLocalSlice = createSlice({
  name: 'conversationLocalSlice',
  initialState,
  reducers: {
    setConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      enhancedApi.endpoints.getConversations.matchFulfilled,
      (state, { payload }: { payload: GetConversationsApiResponse }) => {
        conversationsAdapter.upsertMany(state, payload.conversations);
      },
    );
    builder.addMatcher(
      enhancedApi.endpoints.getConversationById.matchFulfilled,
      (state, { payload }: { payload: GetConversationByIdApiResponse }) => {
        conversationsAdapter.setOne(state, payload);
      },
    );
  },
});

export const {
  selectAll: selectAllConvesations,
  selectById: selectedConversationById,
  selectEntities,
} = conversationsAdapter.getSelectors((state: RootState) => state.conversationLocalSlice ?? initialState);

export const { setConversationId } = conversationsLocalSlice.actions;

export const getSelectedConversation = (state: RootState) =>
  createSelector(
    (state: RootState) => {
      return state?.conversationLocalSlice?.selectedConversationId;
    },
    (id) => {
      return state?.conversationLocalSlice?.entities[id];
    },
  )(state);
