import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { vonageApi } from './api/vonage/vonageApi';
import { conversationsLocalSlice } from './api/vonage/conversationsLocalSlice';
import { usersLocalSlice } from './api/vonage/usersLocalSlice';
import { messagesLocalSlice } from './api/vonage/messageLocalSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
};
const rootReducer = combineReducers({
  [conversationsLocalSlice.name]: conversationsLocalSlice.reducer,
  [usersLocalSlice.name]: usersLocalSlice.reducer,
  [vonageApi.reducerPath]: vonageApi.reducer,
  [messagesLocalSlice.name]: messagesLocalSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(vonageApi.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
