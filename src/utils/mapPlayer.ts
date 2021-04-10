import { Player } from '../types';

export const mapBasicInfo = (data: Record<string, string>): Partial<Player> => ({
  id: data.player_id,
  proDebutDate: data.pro_debut_date,
  bats: data.bats,
  throws: data.throws,
  position: data.position,
});

export const mapDetails = (data: Record<string, string>): Partial<Player> => ({
  name: data.name_display_first_last_html,
  jerseyNumber: data.jersey_number,
  position: data.primary_position_txt,
  age: Number(data.age),
  height: `${data.height_feet}'${data.height_inches}"`,
});
