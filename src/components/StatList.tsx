import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
  width: 100%;

  p {
    margin-bottom: 1em;
    font-weight: 700;
  }
`;

export default function StatList({ stats }: { stats: string[] }) {
  const statList = Object.keys(stats).map((stat, i) => (
    <p key={i}>{stat.toUpperCase()}</p>
  ));

  return <StatsContainer>{statList}</StatsContainer>;
}
