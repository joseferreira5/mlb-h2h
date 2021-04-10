import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import search from './Search/slice';
import players from './playersSlice';

const reducer = combineReducers({
  search,
  players,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
