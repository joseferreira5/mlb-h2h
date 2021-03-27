import { AnyAction } from 'redux';

import { Player } from '../types';
import { PLAYER_LOADED } from './actions';

export type WhichPlayer = 'left' | 'right';

export interface SearchState {
  left: Player | null
  right: Player | null
};

const initialState: SearchState = {
  left: null,
  right: null,
};

export default function reducer(
  state = initialState,
  action: AnyAction
): SearchState {
  if (action.type === PLAYER_LOADED) {
    const player = state[action.which as WhichPlayer];

    return {
      ...state,
      [action.which]: {
        ...player,
        ...action.player,
      },
    };
  }

  return state;
}
