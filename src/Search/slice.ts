import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionCreator } from 'redux';

import { Player } from '../types';
import { mapBasicInfo } from '../utils';
import { playerLoaded, getDetails } from '../playersSlice';

export interface SearchState {
  left: string;
  right: string;
};

export type WhichPlayer = 'left' | 'right';
export type SearchPayload = {
  id: string;
  which: WhichPlayer;
};

const initialState: SearchState = {
  left: '',
  right: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    playerSearched(state, action: PayloadAction<SearchPayload>) {
      const { payload } = action;

      return {
        ...state,
        [payload.which]: payload.id,
      };
    },
  },
});

export const { playerSearched } = searchSlice.actions;

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

    // cache basic info
    dispatch(playerLoaded({
      id: player.player_id,
      player: mapBasicInfo(player) as Player,
    }));

    // pull and cache more info
    dispatch(getDetails(player.player_id));

    // selects the player for the card
    dispatch(playerSearched({
      id: player.player_id,
      which,
    }));
  };
};
