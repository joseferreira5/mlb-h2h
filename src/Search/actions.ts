import { ActionCreator } from 'redux';

import type { WhichPlayer } from './reducer';
import { Player } from '../types';

export const PLAYER_LOADED = 'SEARCH/PLAYER_LOADED';
const playerLoaded = (player: Player, which: WhichPlayer) => ({
  type: PLAYER_LOADED,
  player,
  which,
});

const mapPlayer = (data: Record<string, string>): Player => ({
  id: data.player_id,
  firstName: data.name_first,
  lastName: data.name_last,
});

// ThunkAction<void, SearchState, unknown, AnyAction>
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

    dispatch(playerLoaded(mapPlayer(player), which));
  };
};
