import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export default function PlayerSearch() {
  const [userInput, setUserInput] = useState('');
  const [active, setActive] = useState('Y');
  const [playerId, setPlayerId] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);
  const baseUrl = 'http://lookup-service-prod.mlb.com';
  const queryStr = `/json/named.search_player_all.bam?sport_code='mlb'&active_sw='${active}'&name_part='${userInput}%25'`;

  // useEffect(() => {
  //   async function getPlayer() {
  //     const res = await axios.get(`${baseUrl}${queryStr}`);
  //     setPlayerId(res.data.search_player_all.queryResults.row.player_id);
  //     setPlayerInfo(res.data.search_player_all.queryResults.row);
  //   }
  //   getPlayer();
  // }, [userInput]);

  const handleSearch = async () => {
    const res = await axios.get(`${baseUrl}${queryStr}`);
    setPlayerId(res.data.search_player_all.queryResults.row.player_id);
    setPlayerInfo(res.data.search_player_all.queryResults.row);
  };

  return (
    <Section>
      <input
        type="text"
        placeholder="Enter last name"
        onChange={e => setUserInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {playerInfo && <p>{playerInfo.name_display_last_first}</p>}
    </Section>
  );
}
