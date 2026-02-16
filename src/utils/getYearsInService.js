import { getYears } from './mlbApi';

export default async function getYearsInService(playerId) {
  return getYears(playerId);
}
