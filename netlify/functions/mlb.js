const axios = require('axios');
const API_BASE = 'https://statsapi.mlb.com/api/v1';

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300'
    },
    body: JSON.stringify(body)
  };
}

async function fetchJson(path, params = {}) {
  const cleanParams = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleanParams[key] = value;
    }
  });

  const res = await axios.get(`${API_BASE}${path}`, {
    params: cleanParams,
    timeout: 10000
  });
  return res.data;
}

function toPlayerSearchRow(player) {
  return {
    player_id: String(player.id),
    name_display_first_last: player.fullName,
    name_display_last_first: player.lastFirstName || player.fullName,
    active_sw: player.active ? 'Y' : 'N'
  };
}

function toPlayerDetail(player) {
  const [heightFeet, heightInches] = (player.height || '0\'0"')
    .replace('"', '')
    .split("'");

  return {
    player_id: String(player.id),
    name_display_first_last_html: player.fullName,
    jersey_number: player.primaryNumber || '-',
    primary_position_txt: player.primaryPosition?.abbreviation || '-',
    bats: player.batSide?.description || '-',
    throws: player.pitchHand?.description || '-',
    age: String(player.currentAge || '-'),
    height_feet: heightFeet || '0',
    height_inches: heightInches || '0',
    pro_debut_date: player.mlbDebutDate || null
  };
}

function parseStatsResponse(data) {
  const split = data?.stats?.[0]?.splits?.[0];
  if (!split || !split.stat) {
    return null;
  }

  return { split, stat: split.stat };
}

function toBattingStats(data, season) {
  const parsed = parseStatsResponse(data);
  if (!parsed) return null;

  const { split, stat } = parsed;
  return {
    season: String(season),
    team_id: String(split.team?.id || '0'),
    g: String(stat.gamesPlayed ?? 0),
    ab: String(stat.atBats ?? 0),
    r: String(stat.runs ?? 0),
    h: String(stat.hits ?? 0),
    d: String(stat.doubles ?? 0),
    t: String(stat.triples ?? 0),
    hr: String(stat.homeRuns ?? 0),
    rbi: String(stat.rbi ?? 0),
    bb: String(stat.baseOnBalls ?? 0),
    so: String(stat.strikeOuts ?? 0),
    sb: String(stat.stolenBases ?? 0),
    cs: String(stat.caughtStealing ?? 0),
    avg: stat.avg || '.000',
    obp: stat.obp || '.000',
    slg: stat.slg || '.000',
    ops: stat.ops || '.000'
  };
}

function toPitchingStats(data, season) {
  const parsed = parseStatsResponse(data);
  if (!parsed) return null;

  const { split, stat } = parsed;
  return {
    season: String(season),
    team_id: String(split.team?.id || '0'),
    w: String(stat.wins ?? 0),
    l: String(stat.losses ?? 0),
    era: stat.era || '0.00',
    g: String(stat.gamesPlayed ?? 0),
    gs: String(stat.gamesStarted ?? 0),
    ip: stat.inningsPitched || '0.0',
    h: String(stat.hits ?? 0),
    r: String(stat.runs ?? 0),
    er: String(stat.earnedRuns ?? 0),
    hr: String(stat.homeRuns ?? 0),
    bb: String(stat.baseOnBalls ?? 0),
    so: String(stat.strikeOuts ?? 0),
    whip: stat.whip || '0.00',
    k9: stat.strikeoutsPer9Inn || '0.00',
    bb9: stat.walksPer9Inn || '0.00',
    h9: stat.hitsPer9Inn || '0.00',
    sv: String(stat.saves ?? 0),
    hld: String(stat.holds ?? 0),
    svo: String(stat.saveOpportunities ?? 0),
    wpct: stat.winPercentage || '.000'
  };
}

function getCurrentSeason() {
  return String(new Date().getUTCFullYear());
}

exports.handler = async event => {
  try {
    const { action, id, name, active = 'Y', season, gameType = 'R', group } =
      event.queryStringParameters || {};

    if (action === 'search') {
      if (!name) {
        return json(400, { error: 'Missing name parameter.' });
      }

      const data = await fetchJson('/people/search', { names: name, sportId: 1 });
      const people = Array.isArray(data.people) ? data.people : [];
      let filtered = people;
      if (active === 'Y') {
        filtered = people.filter(player => player.active);
      } else if (active === 'N') {
        filtered = people.filter(player => !player.active);
      }

      return json(200, { rows: filtered.map(toPlayerSearchRow) });
    }

    if (action === 'player') {
      if (!id) {
        return json(400, { error: 'Missing id parameter.' });
      }

      const data = await fetchJson('/people', { personIds: id });
      const player = data.people?.[0];
      if (!player) {
        return json(404, { error: 'Player not found.' });
      }

      return json(200, { row: toPlayerDetail(player) });
    }

    if (action === 'years') {
      if (!id) {
        return json(400, { error: 'Missing id parameter.' });
      }

      const data = await fetchJson('/people', { personIds: id });
      const player = data.people?.[0];
      if (!player) {
        return json(404, { error: 'Player not found.' });
      }

      const debut = player.mlbDebutDate;
      const startYear = debut ? Number(debut.slice(0, 4)) : Number(getCurrentSeason());
      const endYear = Number(getCurrentSeason());
      const years = [];

      for (let currentYear = endYear; currentYear >= startYear; currentYear -= 1) {
        years.push(String(currentYear));
      }

      return json(200, { years });
    }

    if (action === 'stats') {
      if (!id || !group) {
        return json(400, { error: 'Missing id or group parameter.' });
      }

      const targetSeason = season || getCurrentSeason();
      const data = await fetchJson(`/people/${id}/stats`, {
        stats: 'season',
        season: targetSeason,
        group,
        gameType,
        sportId: 1
      });

      const row =
        group === 'pitching'
          ? toPitchingStats(data, targetSeason)
          : toBattingStats(data, targetSeason);

      return json(200, { row });
    }

    return json(400, { error: 'Unsupported action.' });
  } catch (error) {
    return json(502, {
      error: 'Failed to fetch MLB data.',
      details: error.message
    });
  }
};
