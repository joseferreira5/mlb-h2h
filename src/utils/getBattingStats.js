import { getSeasonStats } from './mlbApi';

export default async function getBattingStats(playerId, gameType, season) {
  return getSeasonStats(playerId, gameType, season, 'hitting');
}
