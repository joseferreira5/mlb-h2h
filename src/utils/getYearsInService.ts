import axios from 'axios';

export default async function getYearsInService(playerId: string) {
  const res = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${playerId}'&player_info.col_in=pro_debut_date`
  );
  const startYear = res.data.player_info.queryResults.row.pro_debut_date.slice(
    0,
    4
  );
  let yearsInService = [];

  for (let i = startYear; i <= 2019; i++) {
    yearsInService.push(i);
  }

  return yearsInService.reverse();
}
