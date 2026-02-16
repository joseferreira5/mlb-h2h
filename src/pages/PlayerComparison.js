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
import Message from '../components/styles/Message';

import getYearsInService from '../utils/getYearsInService';
import getBattingStats from '../utils/getBattingStats';
import getPitchingStats from '../utils/getPitchingStats';
import getPlayerName from '../utils/getPlayerName';
import noBattingStats from '../utils/noBattingStats.json';
import noPitchingStats from '../utils/noPitchingStats.json';

const currentSeason = String(new Date().getUTCFullYear());

export default function PlayerComparison() {
  const { playerOneId, playerTwoId } = useParams();
  const [playerOneStats, setPlayerOneStats] = useState(null);
  const [playerTwoStats, setPlayerTwoStats] = useState(null);
  const [playerOneYears, setPlayerOneYears] = useState(null);
  const [playerTwoYears, setPlayerTwoYears] = useState(null);
  const [playerOneName, setPlayerOneName] = useState(null);
  const [playerTwoName, setPlayerTwoName] = useState(null);
  const [gameType, setGameType] = useState('R');
  const [season1, setSeason1] = useState(currentSeason);
  const [season2, setSeason2] = useState(currentSeason);
  const [isPitcher, setIsPitcher] = useState(false);
  const [error, setError] = useState('');
  const left = '1 / 2';
  const right = '3 / 4';

  useEffect(() => {
    let isMounted = true;

    async function loadIdentityData() {
      try {
        setError('');

        const [name1, name2, years1, years2] = await Promise.all([
          getPlayerName(playerOneId),
          getPlayerName(playerTwoId),
          getYearsInService(playerOneId),
          getYearsInService(playerTwoId)
        ]);

        if (!isMounted) return;

        setPlayerOneName(name1);
        setPlayerTwoName(name2);
        setPlayerOneYears(years1);
        setPlayerTwoYears(years2);
      } catch (apiError) {
        if (isMounted) {
          setError('Unable to load player info right now.');
        }
      }
    }

    loadIdentityData();

    return () => {
      isMounted = false;
    };
  }, [playerOneId, playerTwoId]);

  useEffect(() => {
    if (playerOneYears && playerOneYears.length && !playerOneYears.includes(season1)) {
      setSeason1(playerOneYears[0]);
    }
  }, [playerOneYears, season1]);

  useEffect(() => {
    if (playerTwoYears && playerTwoYears.length && !playerTwoYears.includes(season2)) {
      setSeason2(playerTwoYears[0]);
    }
  }, [playerTwoYears, season2]);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        setError('');

        const statsFetcher = isPitcher ? getPitchingStats : getBattingStats;
        const [stats1, stats2] = await Promise.all([
          statsFetcher(playerOneId, gameType, season1),
          statsFetcher(playerTwoId, gameType, season2)
        ]);

        if (!isMounted) return;

        setPlayerOneStats(stats1 || (isPitcher ? noPitchingStats : noBattingStats));
        setPlayerTwoStats(stats2 || (isPitcher ? noPitchingStats : noBattingStats));
      } catch (apiError) {
        if (isMounted) {
          setPlayerOneStats(isPitcher ? noPitchingStats : noBattingStats);
          setPlayerTwoStats(isPitcher ? noPitchingStats : noBattingStats);
          setError('Unable to load stats right now.');
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
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
      {error && <Message>{error}</Message>}
      {playerOneName && (
        <PlayerControl column={left}>
          <h2>{playerOneName}</h2>
          <Select value={season1} onChange={e => setSeason1(e.target.value)}>
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
          <Select value={season2} onChange={e => setSeason2(e.target.value)}>
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
          <StatList stats={isPitcher ? noPitchingStats : noBattingStats} />
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
