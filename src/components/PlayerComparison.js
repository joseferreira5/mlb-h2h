import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import PlayerStatCard from './PlayerStatCard';
import StatList from './StatList';
import ToggleSwitch from './styles/ToggleSwitch';
import filterStats from '../utils/filterStats';

const ComparisonLayout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 10% 1fr;
  height: 100%;
`;

const ControlLayout = styled.div`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default function PlayerComparison() {
  const { playerOneId, playerTwoId } = useParams();
  const [playerOneStats, setPlayerOneStats] = useState(null);
  const [playerTwoStats, setPlayerTwoStats] = useState(null);
  const [gameType, setGameType] = useState('R');
  const [season, setSeason] = useState('2019');
  const [isPitcher, setIsPitcher] = useState(false);
  const left = '1 / 2';
  const right = '3 / 4';

  useEffect(() => {
    const queryStr = `?league_list_id='mlb'&game_type='${gameType}'&season='${season}'&player_id=`;

    async function getBattingStats() {
      const baseUrl =
        'http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam';
      const res1 = await axios.get(`${baseUrl}${queryStr}'${playerOneId}'`);
      const res2 = await axios.get(`${baseUrl}${queryStr}'${playerTwoId}'`);

      setPlayerOneStats(
        filterStats(res1.data.sport_hitting_tm.queryResults.row)
      );
      setPlayerTwoStats(
        filterStats(res2.data.sport_hitting_tm.queryResults.row)
      );
    }

    async function getPitchingStats() {
      const baseUrl =
        'http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam';
      const res1 = await axios.get(`${baseUrl}${queryStr}'${playerOneId}'`);
      const res2 = await axios.get(`${baseUrl}${queryStr}'${playerTwoId}'`);
      const stats1 = res1.data.sport_pitching_tm.queryResults.row;
      const stats2 = res2.data.sport_pitching_tm.queryResults.row;

      if (stats1) {
        setPlayerOneStats(filterStats(stats1));
      }
      if (stats2) {
        setPlayerTwoStats(filterStats(stats2));
      }
    }

    isPitcher ? getPitchingStats() : getBattingStats();
  }, [playerOneId, playerTwoId, gameType, season, isPitcher]);

  const handleToggle = e => {
    e.target.checked ? setIsPitcher(true) : setIsPitcher(false);
  };

  return (
    <ComparisonLayout>
      <ControlLayout>
        <ToggleSwitch onToggle={handleToggle} />
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
        <select onChange={e => setSeason(e.target.value)}>
          <option value="2019">2019</option>
        </select>
      </ControlLayout>
      {playerOneStats && playerTwoStats && (
        <>
          <PlayerStatCard playerStats={playerOneStats} column={left} />
          <StatList stats={playerOneStats} />
          <PlayerStatCard playerStats={playerTwoStats} column={right} />
        </>
      )}
    </ComparisonLayout>
  );
}
