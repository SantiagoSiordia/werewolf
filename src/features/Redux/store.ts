
import { configureStore } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';
import assignableRolesReducer from './assignableRoles';
import gameReducer from './game';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    assignableRoles: assignableRolesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = createSelectorHook<RootState>();