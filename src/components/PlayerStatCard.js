import React from 'react';
import styled from 'styled-components';

const StatCardLayout = styled.div`
  grid-column: ${props => props.column};
  grid-row: 2 / 3;
  justify-self: center;
  align-self: center;
  display: flex;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export default function PlayerStatCard({ playerStats, column }) {
  const statsList = Object.values(playerStats).map((stat, i) => (
    <p key={i}>{stat}</p>
  ));

  return (
    <StatCardLayout column={column}>
      {/* <img
        src={`https://securea.mlb.com/mlb/images/players/head_shot/${props.playerInfo.player_id}.jpg`}
        alt={props.playerInfo.name_display_last_first}
      /> */}
      <StatsList>{statsList}</StatsList>
    </StatCardLayout>
  );
}
