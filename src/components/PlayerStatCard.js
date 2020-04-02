import React from 'react';
import styled from 'styled-components';

const StatCardLayout = styled.div`
  grid-column: ${props => props.column};
  grid-row: 4 / 5;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p {
    margin-bottom: 1em;
  }
`;

export default function PlayerStatCard({ playerStats, column }) {
  const statsList = Object.values(playerStats).map((stat, i) => (
    <p key={i}>{stat}</p>
  ));

  return (
    <StatCardLayout column={column}>
      <StatsList>{statsList}</StatsList>
    </StatCardLayout>
  );
}
