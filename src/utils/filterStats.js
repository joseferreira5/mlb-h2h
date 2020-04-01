const props = [
  'sport_code',
  'sport_id',
  'team_full',
  'league_full',
  'league_id',
  'team_seq',
  'season',
  'player_id',
  'team_id',
  'end_date',
  'league_short',
  'sport',
  'team_short'
];

export default function filterStats(res) {
  return Object.keys(res).reduce((object, key) => {
    if (!props.includes(key)) {
      object[key] = res[key];
    }
    return object;
  }, {});
}
