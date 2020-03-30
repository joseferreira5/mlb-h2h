import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import axios from 'axios';

import SearchLayout from './styles/SearchLayout';
import InputGroup from './styles/InputGroup';
import TextInput from './styles/TextInput';
import Checkbox from './styles/Checkbox';
import Button from './styles/Button';

export default function PlayerSearch(props) {
  const [userInput, setUserInput] = useState('');
  const [active, setActive] = useState('Y');
  const [playerId, setPlayerId] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);
  const themeContext = useContext(ThemeContext);
  const baseUrl =
    'http://lookup-service-prod.mlb.com/json/named.search_player_all.bam';
  const queryStr = `?sport_code='mlb'&active_sw='${active}'&name_part='${userInput}%25'`;

  const handleSearch = async () => {
    const res = await axios.get(`${baseUrl}${queryStr}`);
    setPlayerId(res.data.search_player_all.queryResults.row.player_id);
    setPlayerInfo(res.data.search_player_all.queryResults.row);
  };

  const handleCheck = e => {
    if (e.target.checked) {
      setActive('Y');
    } else {
      setActive('N');
    }
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
        {playerInfo && <p>{playerInfo.name_display_last_first}</p>}
      </InputGroup>
    </SearchLayout>
  );
}
