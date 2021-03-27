import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import StatList from '../components/StatList';
import PlayerStatCard from '../components/PlayerStatCard';

import ComparisonLayout from '../components/styles/ComparisonLayout';
import ControlLayout from '../components/styles/ControlLayout';
import PlayerControl from '../components/styles/PlayerControl';
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
import { GenericObject } from '../types';

type ParamsType = {
  playerOneId: string;
  playerTwoId: string;
}

const left = '1 / 2';
const right = '3 / 4';

export default function Comparison() {
  const { playerOneId, playerTwoId } = useParams<ParamsType>();
  const [playerOneStats, setPlayerOneStats] = useState<GenericObject>(null);
  const [playerTwoStats, setPlayerTwoStats] = useState<GenericObject>(null);
  const [playerOneYears, setPlayerOneYears] = useState<string[] | null>(null);
  const [playerTwoYears, setPlayerTwoYears] = useState<string[] | null>(null);
  const [playerOneName, setPlayerOneName] = useState<GenericObject>(null);
  const [playerTwoName, setPlayerTwoName] = useState<GenericObject>(null);
  const [gameType, setGameType] = useState<string>('R');
  const [season1, setSeason1] = useState<string>('2019');
  const [season2, setSeason2] = useState<string>('2019');
  const [isPitcher, setIsPitcher] = useState<boolean>(false);

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

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <option key={year as string} value={year as string}>
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
