import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
  grid-template-columns: 1fr 15% 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;

  .compare-btn {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    align-self: center;
    justify-self: center;
  }
`;

export default function PlayerSearch() {
  const [userInput, setUserInput] = useState('');
  const [active, setActive] = useState('Y');
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [playerList, setPlayerList] = useState(null);
  const themeContext = useContext(ThemeContext);
  const baseUrl =
    'http://lookup-service-prod.mlb.com/json/named.search_player_all.bam';
  const queryStr = `?sport_code='mlb'&active_sw='${active}'&name_part='${userInput}%25'`;
  const left = '1 / 2';
  const right = '3 / 4';

  const handleSearch = async () => {
    const res = await axios.get(`${baseUrl}${queryStr}`);

    if (res.data.search_player_all.queryResults.totalSize > 1) {
      playerOne ? setPlayerTwo(null) : setPlayerOne(null);
      setPlayerList(res.data.search_player_all.queryResults.row);
    } else {
      setPlayerList(null);
      playerOne
        ? setPlayerTwo(res.data.search_player_all.queryResults.row)
        : setPlayerOne(res.data.search_player_all.queryResults.row);
    }
  };

  const handleCheck = e => {
    e.target.checked ? setActive('Y') : setActive('N');
  };

  const handleSelect = player => {
    playerOne ? setPlayerTwo(player) : setPlayerOne(player);
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
      {playerOne && <PlayerResult playerInfo={playerOne} column={left} />}
      {playerTwo && <PlayerResult playerInfo={playerTwo} column={right} />}
      {playerList && (
        <PlayerList
          playerList={playerList}
          onSelect={handleSelect}
          column={playerOne ? right : left}
        />
      )}
      {playerOne && playerTwo && (
        <Link
          to={`/player-comparison/${playerOne.player_id}/${playerTwo.player_id}`}
        >
          <Button
            className="compare-btn"
            backgroundColor={themeContext.mainBrand}
          >
            Compare
          </Button>
        </Link>
      )}
    </SearchLayout>
  );
}
