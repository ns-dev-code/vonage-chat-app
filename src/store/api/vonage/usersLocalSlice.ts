import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { UserApiDto, GetUsersApiResponse, enhancedApi, GetUserByIdApiResponse } from './usersSlice';
import { RootState } from '../../store';

const usersAdapter = createEntityAdapter<UserApiDto>();
const initialState = { ...usersAdapter.getInitialState(), selectedUserId: '', token: '', app: null };

export const usersLocalSlice = createSlice({
  name: 'usersLocalSlice',
  initialState,
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setApp: (state, action) => {
      state.app = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      enhancedApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }: { payload: GetUsersApiResponse }) => {
        usersAdapter.upsertMany(state, payload.users);
      },
    );
    builder.addMatcher(
      enhancedApi.endpoints.getUserById.matchFulfilled,
      (state, { payload }: { payload: GetUserByIdApiResponse }) => {
        usersAdapter.setOne(state, payload);
      },
    );
  },
});

export const { selectAll, selectById, selectEntities } = usersAdapter.getSelectors(
  (state: RootState) => state.usersLocalSlice ?? initialState,
);

export const getUserById = (state: RootState) =>
  createSelector(
    (state: RootState) => state?.usersLocalSlice?.selectedUserId,
    (id) => {
      return state?.usersLocalSlice?.entities[id];
    },
  )(state);
export const { setSelectedUserId, setToken, setApp } = usersLocalSlice.actions;
