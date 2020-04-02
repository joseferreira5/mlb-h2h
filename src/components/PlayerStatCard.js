import React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const StatCardLayout = styled(motion.div)`
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

export default function PlayerStatCard({
  playerStats,
  column,
  initialPosition
}) {
  const statsList = Object.values(playerStats).map((stat, i) => (
    <p key={i}>{stat}</p>
  ));

  return (
    <AnimatePresence>
      <StatCardLayout
        column={column}
        initial={{ x: initialPosition, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatsList>{statsList}</StatsList>
      </StatCardLayout>
    </AnimatePresence>
  );
}
