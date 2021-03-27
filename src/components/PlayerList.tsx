import React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { GenericObject } from '../types';

const PlayerListLayout = styled(motion.ul)<{ column: string }>`
  grid-column: ${props => props.column};
  grid-row: 2 / 4;
  background-color: ${props => props.theme.darkShade};
  border-radius: 1em;
  padding-top: 0.5em;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: ${props => props.theme.darkShade};
    border-radius: 0 1em 1em 0;
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.mainBrand};
    border-radius: 1em;
  }
`;

const ListItem = styled(motion.li)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 0.5em 1em;
  font-size: 1rem;
  border-bottom: 1px solid #000;
  color: ${props => props.theme.lightShade};

  img {
    width: 3.1em;
    margin-right: 1em;
  }
`;

type PlayerListProps = {
  playerList: GenericObject[];
  column: string;
  onSelect: (player: GenericObject) => void;
}

export default function PlayerList({
  playerList,
  column,
  onSelect,
}: PlayerListProps) {
  const players = playerList.map(player => (
    <ListItem key={player?.player_id as string} onClick={() => onSelect(player)}>
      <img
        src={`https://securea.mlb.com/mlb/images/players/head_shot/${player?.player_id}.jpg`}
        alt={player?.name_display_first_last as string}
      />
      <h2>{player?.name_display_first_last as string}</h2>
    </ListItem>
  ));
  return (
    <AnimatePresence>
      <PlayerListLayout
        column={column}
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {players}
      </PlayerListLayout>
    </AnimatePresence>
  );
}
