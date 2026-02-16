import { getPlayer } from './mlbApi';

export default async function getPlayerName(playerId) {
  const player = await getPlayer(playerId);
  return player?.name_display_first_last_html || null;
}
