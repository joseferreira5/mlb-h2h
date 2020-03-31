import React from 'react';
import styled from 'styled-components';

const PlayerListLayout = styled.ul`
  grid-column: ${props => props.column};
  grid-row: 2 / 4;
  overflow: auto;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1em;

  img {
    width: 50px;
  }
`;

export default function PlayerList({ playerList, onSelect, column }) {
  const players = playerList.map(player => (
    <ListItem key={player.player_id} onClick={() => onSelect(player)}>
      <img
        src={`https://securea.mlb.com/mlb/images/players/head_shot/${player.player_id}.jpg`}
        alt={player.name_display_last_first}
      />
      <h2>{player.name_display_last_first}</h2>
    </ListItem>
  ));
  return <PlayerListLayout column={column}>{players}</PlayerListLayout>;
}
