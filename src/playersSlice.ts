import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionCreator } from 'redux';

import { Player } from './types';
import { mapDetails } from './utils';

export interface PlayersState {
  cached: Record<string, Player>;
};

export type PlayerLoadedPayload = {
  id: string;
  player: Player;
};

const initialState: PlayersState = {
  cached: {},
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    playerLoaded(state, action: PayloadAction<PlayerLoadedPayload>) {
      const { player, id } = action.payload;

      return {
        ...state,
        cached: {
          ...state.cached,
          [id]: {
            ...state.cached[id],
            ...player,
          },
        },
      };
    },
  },
});

export const { playerLoaded } = playersSlice.actions;

export default playersSlice.reducer;

const baseUrl = 'https://lookup-service-prod.mlb.com/json/named';

export function getDetails(
  id: string,
): ActionCreator<Promise<void>> {
  return async (dispatch) => {
    const playerDeets =
      `${baseUrl}.player_info.bam?sport_code='mlb'&player_id='${id}'`;

    const res = await fetch(playerDeets);
    const data = await res.json();

    dispatch(playerLoaded({
      id,
      player: mapDetails(data.player_info.queryResults.row) as Player,
    }));
  };
}
