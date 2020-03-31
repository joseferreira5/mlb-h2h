import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import axios from 'axios';

import InputGroup from './styles/InputGroup';
import TextInput from './styles/TextInput';
import Checkbox from './styles/Checkbox';
import Button from './styles/Button';
import PlayerResult from './PlayerResult';
import PlayerList from './PlayerList';

const SearchLayout = styled.section`
  display: grid;
  grid-template-columns: 1fr 20% 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;
`;

export default function PlayerSearch() {
  const [userInput, setUserInput] = useState('');
  const [active, setActive] = useState('Y');
  const [playerInfo, setPlayerInfo] = useState(null);
  const [playerList, setPlayerList] = useState(null);
  const themeContext = useContext(ThemeContext);
  const baseUrl =
    'http://lookup-service-prod.mlb.com/json/named.search_player_all.bam';
  const queryStr = `?sport_code='mlb'&active_sw='${active}'&name_part='${userInput}%25'`;

  const handleSearch = async () => {
    const res = await axios.get(`${baseUrl}${queryStr}`);

    if (res.data.search_player_all.queryResults.totalSize > 1) {
      setPlayerInfo(null);
      setPlayerList(res.data.search_player_all.queryResults.row);
    } else {
      setPlayerList(null);
      setPlayerInfo(res.data.search_player_all.queryResults.row);
    }
  };

  const handleCheck = e => {
    e.target.checked ? setActive('Y') : setActive('N');
  };

  const handleSelect = player => {
    setPlayerInfo(player);
    setPlayerList(null);
  };

  return (
    <SearchLayout>
      <InputGroup>
        <TextInput
          type="text"
          placeholder="Enter last name"
          onChange={e => setUserInput(e.target.value)}
        />
        <label>
          <Checkbox onChange={handleCheck} defaultChecked />
          Active Player
        </label>
        <Button onClick={handleSearch} backgroundColor={themeContext.mainBrand}>
          Search
        </Button>
      </InputGroup>
      {playerInfo && <PlayerResult playerInfo={playerInfo} />}
      {playerList && (
        <PlayerList playerList={playerList} onSelect={handleSelect} />
      )}
    </SearchLayout>
  );
}
