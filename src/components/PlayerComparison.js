import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import PlayerStatCard from './PlayerStatCard';
import StatList from './StatList';
import ToggleSwitch from './styles/ToggleSwitch';
import ActionImg from './styles/ActionImg';
import getYearsInService from '../utils/getYearsInService';
import getBattingStats from '../utils/getBattingStats';
import getPitchingStats from '../utils/getPitchingStats';
import getPlayerName from '../utils/getPlayerName';
import filterStats from '../utils/filterStats';

const ComparisonLayout = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 20% 1fr;
  grid-template-rows: 5% 5% 13% 1fr;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
`;

const ControlLayout = styled.div`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-around;
  align-items: center;

  label {
    display: flex;
    align-items: center;
  }
`;

const PlayerControlLayout = styled.div`
  grid-column: 1 / 4;
  grid-row: 2 / 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
`;

export default function PlayerComparison() {
  const { playerOneId, playerTwoId } = useParams();
  const [playerOneStats, setPlayerOneStats] = useState(null);
  const [playerTwoStats, setPlayerTwoStats] = useState(null);
  const [playerOneYears, setPlayerOneYears] = useState(null);
  const [playerTwoYears, setPlayerTwoYears] = useState(null);
  const [playerOneName, setPlayerOneName] = useState(null);
  const [playerTwoName, setPlayerTwoName] = useState(null);
  const [gameType, setGameType] = useState('R');
  const [season1, setSeason1] = useState('2019');
  const [season2, setSeason2] = useState('2019');
  const [isPitcher, setIsPitcher] = useState(false);
  const left = '1 / 2';
  const right = '3 / 4';

  useEffect(() => {
    async function setPlayerNames() {
      const playerName1 = await getPlayerName(playerOneId);
      const playerName2 = await getPlayerName(playerTwoId);

      setPlayerOneName(playerName1);
      setPlayerTwoName(playerName2);
    }

    async function setYearsInService() {
      const yearsInService1 = await getYearsInService(playerOneId);
      const yearsInService2 = await getYearsInService(playerTwoId);

      setPlayerOneYears(yearsInService1);
      setPlayerTwoYears(yearsInService2);
    }

    async function setBattingStats() {
      const stats1 = await getBattingStats(playerOneId, gameType, season1);
      const stats2 = await getBattingStats(playerTwoId, gameType, season2);

      if (stats1) {
        setPlayerOneStats(filterStats(stats1));
      }
      if (stats2) {
        setPlayerTwoStats(filterStats(stats2));
      }
    }

    async function setPitchingStats() {
      const stats1 = await getPitchingStats(playerOneId, gameType, season1);
      const stats2 = await getPitchingStats(playerTwoId, gameType, season2);

      if (stats1) {
        setPlayerOneStats(filterStats(stats1));
      }
      if (stats2) {
        setPlayerTwoStats(filterStats(stats2));
      }
    }
    setPlayerNames();
    setYearsInService();
    isPitcher ? setPitchingStats() : setBattingStats();
  }, [playerOneId, playerTwoId, gameType, season1, season2, isPitcher]);

  const handleToggle = e => {
    e.target.checked ? setIsPitcher(true) : setIsPitcher(false);
  };

  return (
    <ComparisonLayout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ControlLayout>
        <label>
          See {isPitcher ? 'Batting' : 'Pitching'}
          <ToggleSwitch onToggle={handleToggle} />
        </label>
        <select onChange={e => setGameType(e.target.value)}>
          <option value="R">Regular Season</option>
          <option value="S">Spring Training</option>
          <option value="E">Exhibition</option>
          <option value="A">All Star Game</option>
          <option value="D">Division Series</option>
          <option value="F">First Round (Wild Card)</option>
          <option value="L">League Championship</option>
          <option value="W">World Series</option>
        </select>
      </ControlLayout>
      <PlayerControlLayout>
        {playerOneName && (
          <label>
            <select onChange={e => setSeason1(e.target.value)}>
              {playerOneYears &&
                playerOneYears.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>{' '}
            {playerOneName}
          </label>
        )}
        {playerTwoName && (
          <label>
            {playerTwoName}{' '}
            <select onChange={e => setSeason2(e.target.value)}>
              {playerTwoYears &&
                playerTwoYears.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </label>
        )}
      </PlayerControlLayout>

      {playerOneStats && playerTwoStats && (
        <>
          <ActionImg
            column={left}
            src={`https://securea.mlb.com/images/players/action_shots/${playerOneId}.jpg`}
            alt={playerOneId}
          />
          <PlayerStatCard playerStats={playerOneStats} column={left} />
          <StatList stats={playerOneStats ? playerOneStats : playerTwoStats} />
          <ActionImg
            column={right}
            src={`https://securea.mlb.com/images/players/action_shots/${playerTwoId}.jpg`}
            alt={playerTwoId}
          />
          <PlayerStatCard playerStats={playerTwoStats} column={right} />
        </>
      )}
    </ComparisonLayout>
  );
}
