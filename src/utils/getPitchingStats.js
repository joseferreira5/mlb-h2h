import { getSeasonStats } from './mlbApi';

export default async function getPitchingStats(playerId, gameType, season) {
  return getSeasonStats(playerId, gameType, season, 'pitching');
}
