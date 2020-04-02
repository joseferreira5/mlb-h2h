import axios from 'axios';

export default async function getPlayerName(playerId) {
  const res = await axios.get(
    `http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${playerId}'&player_info.col_in=name_display_first_last_html`
  );
  return res.data.player_info.queryResults.row.name_display_first_last_html;
}
