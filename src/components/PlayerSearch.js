import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

import TextInput from './styles/TextInput';
import Checkbox from './styles/Checkbox';
import Button from './styles/Button';
import PlayerResult from './PlayerResult';
import PlayerList from './PlayerList';

const SearchLayout = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 10% 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;

  .compare-btn {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    align-self: start;
    justify-self: center;
  }
`;

const Form = styled.form`
  grid-column: 1 / 4;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 50%;
  padding: 0 1em;
`;

export default function PlayerSearch() {
  const [userInput, setUserInput] = useState('');
  const [active, setActive] = useState('Y');
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [playerList, setPlayerList] = useState(null);
  const themeContext = useContext(ThemeContext);
  const baseUrl = 'http://lookup-service-prod.mlb.com/json/named';
  const searchPlayer = `.search_player_all.bam?sport_code='mlb'&active_sw='${active}'&name_part='${userInput}%25'`;
  const left = '1 / 2';
  const right = '3 / 4';

  const handleSearch = async e => {
    e.preventDefault();

    if (userInput.length === 0) return null;

    const res = await axios.get(`${baseUrl}${searchPlayer}`);

    if (res.data.search_player_all.queryResults.totalSize > 1) {
      playerOne ? setPlayerTwo(null) : setPlayerOne(null);
      setPlayerList(res.data.search_player_all.queryResults.row);
      setUserInput('');
    } else {
      setPlayerList(null);
      playerOne
        ? setPlayerTwo(res.data.search_player_all.queryResults.row)
        : setPlayerOne(res.data.search_player_all.queryResults.row);
      setUserInput('');
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
    <SearchLayout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Form onSubmit={handleSearch}>
        <TextInput
          type="text"
          placeholder="Enter last name"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <label>
          <Checkbox onChange={handleCheck} defaultChecked />
          Active Player
        </label>
        <Button type="submit" backgroundColor={themeContext.mainBrand}>
          Search
        </Button>
      </Form>
      {playerOne && (
        <PlayerResult
          playerInfo={playerOne}
          column={left}
          initialPosition={playerOne ? -200 : 200}
        />
      )}
      {playerTwo && (
        <PlayerResult
          playerInfo={playerTwo}
          column={right}
          initialPosition={playerOne ? 200 : -200}
        />
      )}
      {playerList && (
        <PlayerList
          playerList={playerList}
          onSelect={handleSelect}
          column={playerOne ? right : left}
        />
      )}
      {playerOne && playerTwo && (
        <Link
          className="compare-btn"
          to={`/player-comparison/${playerOne.player_id}/${playerTwo.player_id}`}
        >
          <AnimatePresence>
            <Button
              backgroundColor={themeContext.fruitSalad}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Compare
            </Button>
          </AnimatePresence>
        </Link>
      )}
    </SearchLayout>
  );
}
