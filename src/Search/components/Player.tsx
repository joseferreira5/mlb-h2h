import React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { WhichPlayer } from '../slice';
import { Player } from '../../types';

type PlayerResultProps = {
  player: Player;
  which: WhichPlayer;
  initialPosition: number;
}

const PlayerResult = ({
  player,
  which,
  initialPosition,
}: PlayerResultProps) => (
  <AnimatePresence>
    <ResultLayout
      column={columns[which]}
      initial={{ x: initialPosition, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {player.name && (
        <>
          <h2>
            {player.name} #
            {player.jerseyNumber}
          </h2>
          <img
            src={`https://securea.mlb.com/mlb/images/players/head_shot/${player.id}.jpg`}
            alt={player.name}
          />
          <p>Position: {player.position}</p>
          <p>
            <span>Bats: {player.bats}</span>
            {' | '}
            <span>Throws: {player.throws}</span>
          </p>
          <p>
            <span>Age: {player.age}</span>
            {' | '}
            <span>
              Height: {player.height}
            </span>
          </p>
        </>
      )}
    </ResultLayout>
  </AnimatePresence>
);

export default PlayerResult;

const columns: Record<WhichPlayer, string> = {
  left: '1 / 2',
  right: '3 / 4',
};

const ResultLayout = styled(motion.div)<{
  column: string;
}>`
  grid-column: ${props => props.column};
  grid-row: 2 / 4;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => props.theme.darkShade};
  border-radius: 1em;
  min-height: 55%;
  min-width: 50%;
  width: 10em;
  z-index: 1;

  h2 {
    color: ${props => props.theme.lightShade};
    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;
  }

  img {
    width: 8em;
  }

  p {
    color: ${props => props.theme.lightShade};
    font-weight: 700;
  }
`;
