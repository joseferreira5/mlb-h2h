import axios from 'axios';

export default async function getPitchingStats(playerId, gameType, season) {
  const res = await axios.get(
    `http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${gameType}'&season='${season}'&player_id='${playerId}'`
  );
  return res.data.sport_pitching_tm.queryResults.row;
}
