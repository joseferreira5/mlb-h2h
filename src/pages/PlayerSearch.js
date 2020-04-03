import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

import PlayerResult from '../components/PlayerResult';
import PlayerList from '../components/PlayerList';

import SearchLayout from '../components/styles/SearchLayout';
import Form from '../components/styles/Form';
import TextInput from '../components/styles/TextInput';
import Checkbox from '../components/styles/Checkbox';
import Button from '../components/styles/Button';
import Message from '../components/styles/Message';

export default function PlayerSearch() {
  const [userInput, setUserInput] = useState('');
  const [active, setActive] = useState('Y');
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [playerList, setPlayerList] = useState(null);
  const themeContext = useContext(ThemeContext);
  const inputEl = useRef(null);

  const baseUrl = 'https://lookup-service-prod.mlb.com/json/named';
  const searchPlayer = `.search_player_all.bam?sport_code='mlb'&active_sw='${active}'&name_part='${userInput}%25'`;
  const left = '1 / 2';
  const right = '3 / 4';

  const handleSearch = async e => {
    e.preventDefault();
    inputEl.current.blur();

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
          ref={inputEl}
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
      {playerOne === null && (
        <Message>
          Welcome to MLB Head to Head! An easier way to look up and compare
          player stats. Enter a players last name to get started!
        </Message>
      )}
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
