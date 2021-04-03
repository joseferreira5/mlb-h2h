import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import search from './Search/slice';

const reducer = combineReducers({
  search,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
