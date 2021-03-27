import { combineReducers } from 'redux';

import search, { SearchState } from './Search/reducer';

export interface RootState {
  search: SearchState
}

const store = combineReducers({
  search,
});

export default store;
