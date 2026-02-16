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
    text-align: center;
  }
`;

export default function StatList({ statKeys, statLabels }) {
  const statList = statKeys.map(statKey => (
    <p key={statKey}>{(statLabels[statKey] || statKey).toUpperCase()}</p>
  ));

  return <StatsContainer>{statList}</StatsContainer>;
}
