import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import { searchPlayers } from '../utils/mlbApi';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const themeContext = useContext(ThemeContext);
  const inputEl = useRef(null);

  const left = '1 / 2';
  const right = '3 / 4';

  const handleSearch = async e => {
    e.preventDefault();
    if (inputEl.current) {
      inputEl.current.blur();
    }

    const trimmedInput = userInput.trim();
    if (!trimmedInput.length) return;

    try {
      setLoading(true);
      setError('');

      const players = await searchPlayers(trimmedInput, active);

      if (!players.length) {
        setPlayerList(null);
        setError('No players found for that search.');
        return;
      }

      if (players.length > 1) {
        playerOne ? setPlayerTwo(null) : setPlayerOne(null);
        setPlayerList(players);
      } else {
        setPlayerList(null);
        playerOne ? setPlayerTwo(players[0]) : setPlayerOne(players[0]);
      }

      setUserInput('');
    } catch (apiError) {
      setPlayerList(null);
      setError('Unable to search players right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = e => {
    e.target.checked ? setActive('Y') : setActive('N');
  };

  const handleSelect = player => {
    playerOne ? setPlayerTwo(player) : setPlayerOne(player);
    setPlayerList(null);
    setError('');
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
        <Button
          type="submit"
          backgroundColor={themeContext.mainBrand}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Form>
      {error && <Message>{error}</Message>}
      {!error && playerOne === null && playerList === null && (
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
