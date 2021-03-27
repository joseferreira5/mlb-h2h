import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

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

type PlayerResultProps = {
  playerInfo: Record<string, unknown>;
  column: string;
  initialPosition: number;
}

export default function PlayerResult({
  playerInfo,
  column,
  initialPosition,
}: PlayerResultProps) {
  const [playerDetail, setPlayerDetail] = useState<Record<string, unknown>>();
  const baseUrl = 'https://lookup-service-prod.mlb.com';
  const playerDeets = `/json/named.player_info.bam?sport_code='mlb'&player_id='${playerInfo.player_id}'`;

  useEffect(() => {
    async function getDetails() {
      const res = await axios.get(`${baseUrl}${playerDeets}`);
      setPlayerDetail(res.data.player_info.queryResults.row);
    }
    getDetails();
  }, [playerDeets]);

  return (
    <AnimatePresence>
      <ResultLayout
        column={column}
        initial={{ x: initialPosition, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {playerDetail && (
          <>
            <h2>
              {playerDetail?.name_display_first_last_html} #
              {playerDetail?.jersey_number}
            </h2>
            <img
              src={`https://securea.mlb.com/mlb/images/players/head_shot/${playerInfo.player_id}.jpg`}
              alt={playerInfo.name_display_last_first as string}
            />
            <p>Position: {playerDetail.primary_position_txt}</p>
            <p>
              <span>Bats: {playerDetail.bats}</span>
              {' | '}
              <span>Throws: {playerDetail.throws}</span>
            </p>
            <p>
              <span>Age: {playerDetail.age}</span>
              {' | '}
              <span>
                Height: {playerDetail.height_feet}'{playerDetail.height_inches}"
              </span>
            </p>
          </>
        )}
      </ResultLayout>
    </AnimatePresence>
  );
}
