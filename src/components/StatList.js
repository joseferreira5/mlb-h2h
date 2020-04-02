import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  align-self: center;
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function StatList({ stats }) {
  const statList = Object.keys(stats).map((stat, i) => (
    <p key={i}>{stat.toUpperCase()}</p>
  ));

  return <StatsContainer>{statList}</StatsContainer>;
}
