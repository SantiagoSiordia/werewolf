
import { configureStore } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';
import gameReducer from './game';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = createSelectorHook<RootState>();