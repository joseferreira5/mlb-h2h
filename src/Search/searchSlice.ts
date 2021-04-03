import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Player } from '../types';

export interface SearchState {
  left: Player | null
  right: Player | null
};

export type WhichPlayer = 'left' | 'right';
export type SearchPayload = {
  player: Player;
  which: WhichPlayer;
};

const initialState: SearchState = {
  left: null,
  right: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    playerLoaded(state, action: PayloadAction<SearchPayload>) {
      const { payload } = action;
      const player = state[payload.which];

      return {
        ...state,
        [payload.which]: {
          ...player,
          ...payload.player,
        },
      };
    },
  },
});

export const { playerLoaded } = searchSlice.actions;

export default searchSlice.reducer;
