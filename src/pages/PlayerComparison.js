import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import PlayerStatCard from '../components/PlayerStatCard';
import StatList from '../components/StatList';
import ToggleSwitch from '../components/styles/ToggleSwitch';
import Select from '../components/styles/Select';
import TeamLogo from '../components/styles/TeamLogo';
import getYearsInService from '../utils/getYearsInService';
import getBattingStats from '../utils/getBattingStats';
import getPitchingStats from '../utils/getPitchingStats';
import getPlayerName from '../utils/getPlayerName';
import filterStats from '../utils/filterStats';
import noBattingStats from '../utils/noBattingStats.json';
import noPitchingStats from '../utils/noPitchingStats.json';

const ComparisonLayout = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 20% 1fr;
  grid-template-rows: 6% 10% 10% 1fr;
  grid-row-gap: 0.5em;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  padding: 0.2em;

  &::-webkit-scrollbar {
    background-color: #fff;
    border-radius: 1em;
    width: 0.2em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.mainBrand};
    border-radius: 1em;
  }
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

const PlayerControl = styled.div`
  grid-column: ${props => props.column};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  h2 {
    margin-bottom: 0.2em;
  }
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

      stats1
        ? setPlayerOneStats(filterStats(stats1))
        : setPlayerOneStats(filterStats(noBattingStats));

      stats2
        ? setPlayerTwoStats(filterStats(stats2))
        : setPlayerTwoStats(filterStats(noBattingStats));
    }

    async function setPitchingStats() {
      const stats1 = await getPitchingStats(playerOneId, gameType, season1);
      const stats2 = await getPitchingStats(playerTwoId, gameType, season2);

      stats1
        ? setPlayerOneStats(filterStats(stats1))
        : setPlayerOneStats(filterStats(noPitchingStats));

      stats2
        ? setPlayerTwoStats(filterStats(stats2))
        : setPlayerTwoStats(filterStats(noPitchingStats));
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
        <Select onChange={e => setGameType(e.target.value)}>
          <option value="R">Regular Season</option>
          <option value="S">Spring Training</option>
          <option value="E">Exhibition</option>
          <option value="A">All Star Game</option>
          <option value="D">Division Series</option>
          <option value="F">First Round (Wild Card)</option>
          <option value="L">League Championship</option>
          <option value="W">World Series</option>
        </Select>
        <label>
          See {isPitcher ? 'Batting' : 'Pitching'}
          <ToggleSwitch onToggle={handleToggle} />
        </label>
      </ControlLayout>
      {playerOneName && (
        <PlayerControl column={left}>
          <h2>{playerOneName}</h2>
          <Select onChange={e => setSeason1(e.target.value)}>
            {playerOneYears &&
              playerOneYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </Select>
        </PlayerControl>
      )}
      {playerTwoName && (
        <PlayerControl column={right}>
          <h2>{playerTwoName}</h2>
          <Select onChange={e => setSeason2(e.target.value)}>
            {playerTwoYears &&
              playerTwoYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </Select>
        </PlayerControl>
      )}
      {playerOneStats && playerTwoStats && (
        <>
          <TeamLogo
            column={left}
            src={
              playerOneStats.team_id === '0'
                ? 'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg'
                : `https://www.mlbstatic.com/team-logos/${playerOneStats.team_id}.svg`
            }
            alt={playerOneId}
          />
          <PlayerStatCard
            playerStats={playerOneStats}
            column={left}
            initialPosition={200}
          />
          <StatList
            stats={
              isPitcher
                ? filterStats(noPitchingStats)
                : filterStats(noBattingStats)
            }
          />
          <TeamLogo
            column={right}
            src={
              playerTwoStats.team_id === '0'
                ? 'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg'
                : `https://www.mlbstatic.com/team-logos/${playerTwoStats.team_id}.svg`
            }
            alt={playerTwoId}
          />
          <PlayerStatCard
            playerStats={playerTwoStats}
            column={right}
            initialPosition={-200}
          />
        </>
      )}
    </ComparisonLayout>
  );
}
