import { GenericObject } from '../types';

const props = [
  'sport_code',
  'sport_id',
  'team_full',
  'league_full',
  'league_id',
  'team_seq',
  'season',
  'player_id',
  'end_date',
  'league_short',
  'sport',
  'team_short',
  'team_abbrev',
  'league'
];

export default function filterStats(res: any): GenericObject {
  return Object.keys(res).reduce((obj: Record<string, unknown>, key: string) => {
    if (!props.includes(key)) {
      obj[key] = res[key];
    }
    return obj;
  }, {});
}
