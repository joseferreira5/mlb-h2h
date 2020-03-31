import React from 'react';
import styled from 'styled-components';

const ResultLayout = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  h2 {
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 0.5em;
  }

  img {
    width: 100px;
  }
`;

export default function PlayerResult(props) {
  return (
    <ResultLayout>
      <h2>{props.playerInfo.name_display_last_first}</h2>
      <img
        src={`https://securea.mlb.com/mlb/images/players/head_shot/${props.playerInfo.player_id}.jpg`}
        alt={props.playerInfo.name_display_last_first}
      />
    </ResultLayout>
  );
}
