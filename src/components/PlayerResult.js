import React from 'react';
import styled from 'styled-components';

const ResultLayout = styled.div`
  grid-column: ${props => props.column};
  grid-row: 2 / 3;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBrand};
  border-radius: 1em;
  height: 100%;
  min-width: 50%;

  h2 {
    color: ${props => props.theme.lightShade};
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 0.5em;
  }

  img {
    width: 8em;
  }
`;

export default function PlayerResult(props) {
  return (
    <ResultLayout column={props.column}>
      <h2>{props.playerInfo.name_display_last_first}</h2>
      <img
        src={`https://securea.mlb.com/mlb/images/players/head_shot/${props.playerInfo.player_id}.jpg`}
        alt={props.playerInfo.name_display_last_first}
      />
    </ResultLayout>
  );
}
