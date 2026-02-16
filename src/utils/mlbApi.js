import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE || '/.netlify/functions/mlb';

export async function searchPlayers(name, active = 'Y') {
  const res = await axios.get(baseUrl, {
    params: { action: 'search', name, active }
  });
  return res.data.rows || [];
}

export async function getPlayer(playerId) {
  const res = await axios.get(baseUrl, {
    params: { action: 'player', id: playerId }
  });
  return res.data.row || null;
}

export async function getYears(playerId) {
  const res = await axios.get(baseUrl, {
    params: { action: 'years', id: playerId }
  });
  return res.data.years || [];
}

export async function getSeasonStats(playerId, gameType, season, group) {
  const res = await axios.get(baseUrl, {
    params: {
      action: 'stats',
      id: playerId,
      gameType,
      season,
      group
    }
  });
  return res.data.row || null;
}
