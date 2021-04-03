export type GenericObject = Record<string, unknown> | null;

type PitchingStats = {
  ab: string;
  ao: string;
  avg: string;
  babip: string;
  bb: string;
  bb9: string;
  bk: string;
  bq: string;
  bqs: string;
  cg: string;
  cs: string;
  db: string;
  end_date: string;
  er: string;
  era: string;
  g: string;
  gf: string;
  gidp: string;
  gidp_opp: string;
  go: string;
  go_ao: string;
  gs: string;
  h: string;
  h9: string;
  hb: string;
  hfly: string;
  hgnd: string;
  hld: string;
  hldr: string;
  hpop: string;
  hr: string;
  hr9: string;
  ibb: string;
  ip: string;
  ir: string;
  irs: string;
  k9: string;
  kbb: string;
  l: string;
  league: string;
  league_full: string;
  league_id: string;
  league_short: string;
  np: string;
  obp: string;
  ops: string;
  pgs: string;
  pip: string;
  pk: string;
  player_id: string;
  ppa: string;
  qs: string;
  r: string;
  rs9: string;
  s: string;
  sac: string;
  sb: string;
  season: string;
  sf: string;
  sho: string;
  slg: string;
  so: string;
  spct: string;
  sport: string;
  sport_code: string;
  sport_id: string;
  sv: string;
  svo: string;
  tbf: string;
  team_abbrev: string;
  team_full: string;
  team_id: string;
  team_seq: string;
  team_short: string;
  tr: string;
  w: string;
  whip: string;
  wp: string;
  wpct: string;
};

type HittingStats = {
  ab: string;
  ao: string;
  avg: string;
  babip: string;
  bb: string;
  cs: string;
  d: string;
  end_date: string;
  g: string;
  gidp: string;
  gidp_opp: string;
  go: string;
  go_ao: string;
  h: string;
  hbp: string;
  hfly: string;
  hgnd: string;
  hldr: string;
  hpop: string;
  hr: string;
  ibb: string;
  league: string;
  league_full: string;
  league_id: string;
  league_short: string;
  lob: string;
  np: string;
  obp: string;
  ops: string;
  player_id: string;
  ppa: string;
  r: string;
  rbi: string;
  roe: string;
  sac: string;
  sb: string;
  season: string;
  sf: string;
  slg: string;
  so: string;
  sport: string;
  sport_code: string;
  sport_id: string;
  t: string;
  tb: string;
  team_abbrev: string;
  team_full: string;
  team_id: string;
  team_seq: string;
  team_short: string;
  tpa: string;
  wo: string;
  xbh: string;
};

export type Player = {
  id: string;
  name: string;
  jerseyNumber?: string;
  position?: string;
  bats?: string;
  throws?: string;
  age?: number;
  height?: string;
  primaryStat?: string;
  proDebutDate?: Date;
  pitching?: Record<string, PitchingStats>;
  hitting?: Record<string, HittingStats>;
};
