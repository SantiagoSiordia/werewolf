
import { combineReducers } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';
import gameReducer from './game';

const rootReducer = combineReducers({
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector = createSelectorHook<RootState>();

export default rootReducer;