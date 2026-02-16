const battingStatKeys = [
  'season',
  'g',
  'ab',
  'r',
  'h',
  'd',
  't',
  'hr',
  'rbi',
  'bb',
  'so',
  'sb',
  'cs',
  'avg',
  'obp',
  'slg',
  'ops'
];

const pitchingStatKeys = [
  'season',
  'w',
  'l',
  'era',
  'g',
  'gs',
  'ip',
  'h',
  'r',
  'er',
  'hr',
  'bb',
  'so',
  'whip',
  'k9',
  'bb9',
  'h9',
  'sv',
  'hld',
  'svo',
  'wpct'
];

const battingLabels = {
  season: 'Season',
  g: 'Games',
  ab: 'At Bats',
  r: 'Runs',
  h: 'Hits',
  d: 'Doubles',
  t: 'Triples',
  hr: 'Home Runs',
  rbi: 'RBI',
  bb: 'Walks',
  so: 'Strikeouts',
  sb: 'Stolen Bases',
  cs: 'Caught Stealing',
  avg: 'AVG',
  obp: 'OBP',
  slg: 'SLG',
  ops: 'OPS'
};

const pitchingLabels = {
  season: 'Season',
  w: 'Wins',
  l: 'Losses',
  era: 'ERA',
  g: 'Games',
  gs: 'Games Started',
  ip: 'Innings Pitched',
  h: 'Hits',
  r: 'Runs',
  er: 'Earned Runs',
  hr: 'Home Runs',
  bb: 'Walks',
  so: 'Strikeouts',
  whip: 'WHIP',
  k9: 'K/9',
  bb9: 'BB/9',
  h9: 'H/9',
  sv: 'Saves',
  hld: 'Holds',
  svo: 'Save Opps',
  wpct: 'Win %'
};

export const battingStatConfig = {
  keys: battingStatKeys,
  labels: battingLabels
};

export const pitchingStatConfig = {
  keys: pitchingStatKeys,
  labels: pitchingLabels
};
