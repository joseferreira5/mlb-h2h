import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionCreator } from 'redux';

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

const mapPlayer = (data: Record<string, string>): Player => ({
  id: data.player_id,
  firstName: data.name_first,
  lastName: data.name_last,
});

export function search(
  active: string,
  query: string,
  which: WhichPlayer
): ActionCreator<Promise<void>> {
  return async (dispatch) => {
    const baseUrl = 'https://lookup-service-prod.mlb.com/json/named';
    const searchPlayer =
      `.search_player_all.bam?sport_code='mlb'&active_sw='${active}'&name_part='${query}%25'`;

    const res = await fetch(`${baseUrl}${searchPlayer}`);
    const data = await res.json();

    const results = data.search_player_all.queryResults.row as any;
    let player;

    if (results.length > 1) {
      player = results[0];
    } else {
      player = results;
    }

    dispatch(playerLoaded({
      player: mapPlayer(player),
      which,
    }));
  };
};
