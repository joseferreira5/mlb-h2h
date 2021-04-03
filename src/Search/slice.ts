import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionCreator } from 'redux';

import { Player } from '../types';
import { mapBasicInfo, mapDetails } from '../utils';

export interface SearchState {
  left: Player | null
  right: Player | null
};

export type WhichPlayer = 'left' | 'right';
export type SearchPayload = {
  player: Partial<Player>;
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

const baseUrl = 'https://lookup-service-prod.mlb.com/json/named';

export function search(
  active: string,
  query: string,
  which: WhichPlayer
): ActionCreator<Promise<void>> {
  return async (dispatch) => {
    const searchPlayer =
      `${baseUrl}.search_player_all.bam?sport_code='mlb'&active_sw='${active}'&name_part='${query}%25'`;

    const res = await fetch(searchPlayer);
    const data = await res.json();

    const results = data.search_player_all.queryResults.row as any;
    let player;

    if (results.length > 1) {
      player = results[0];
    } else {
      player = results;
    }

    dispatch(playerLoaded({
      player: mapBasicInfo(player),
      which,
    }));

    dispatch(getDetails(player.player_id, which));
  };
};

export function getDetails(
  id: string,
  which: WhichPlayer
): ActionCreator<Promise<void>> {
  return async (dispatch) => {
    const playerDeets =
      `${baseUrl}.player_info.bam?sport_code='mlb'&player_id='${id}'`;

    const res = await fetch(playerDeets);
    const data = await res.json();

    dispatch(playerLoaded({
      player: mapDetails(data.player_info.queryResults.row),
      which,
    }));
  };
}
