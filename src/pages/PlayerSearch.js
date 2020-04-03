import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

import TextInput from '../components/styles/TextInput';
import Checkbox from '../components/styles/Checkbox';
import Button from '../components/styles/Button';
import PlayerResult from '../components/PlayerResult';
import PlayerList from '../components/PlayerList';

const SearchLayout = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 10% 1fr;
  grid-template-rows: 15% 1fr 1fr;
  grid-row-gap: 2em;
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
  height: 100%;
  padding: 0 1em;
`;

const Message = styled(motion.p)`
  grid-column: 1 / 4;
  justify-content: center;
  padding: 1em;
  font-size: 1.6rem;
  line-height: 1.3;
  text-align: center;
  height: 100%;
`;

export default function PlayerSearch() {
  const [userInput, setUserInput] = useState('');
  const [active, setActive] = useState('Y');
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [playerList, setPlayerList] = useState(null);
  const themeContext = useContext(ThemeContext);
  const baseUrl = 'https://lookup-service-prod.mlb.com/json/named';
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
