import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import Player from './components/Player';
// import PlayerList from './components/PlayerList';
import SearchLayout from './components/SearchLayout';
import Form from './components/Form';
import TextInput from './components/TextInput';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import Message from './components/Message';
import { search } from './slice';
import { useAppSelector, useAppDispatch } from '../hooks';

export function Search() {
  const { left, right } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const [userInput, setUserInput] = useState<string>('');
  const [active, setActive] = useState<string>('Y');
  // const [playerList, setPlayerList] = useState<GenericObject[] | null>(null);
  const themeContext = useContext(ThemeContext);
  const inputEl = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    inputEl?.current?.blur();

    if (userInput.length === 0) return null;

    dispatch(search(
      active,
      userInput,
      left === null ? 'left' : 'right'
    ));
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setActive('Y') : setActive('N');
  };

  // const handleSelect = (player: GenericObject) => {
  //   playerOne ? setPlayerTwo(player) : setPlayerOne(player);
  //   setPlayerList(null);
  // };

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

      {left === null && (
        <Message>
          Welcome to MLB Head to Head! An easier way to look up and compare
          player stats. Enter a players last name to get started!
        </Message>
      )}

      {left && (
        <Player
          player={left}
          which="left"
          initialPosition={left ? -200 : 200}
        />
      )}

      {right && (
        <Player
          player={right}
          which="right"
          initialPosition={right ? 200 : -200}
        />
      )}

      {/**playerList && (
        <PlayerList
          playerList={playerList}
          onSelect={handleSelect}
          column={playerOne ? rightColumn : leftColumn}
        />
      )*/}

      {left && right && (
        <Link
          className="compare-btn"
          to={`/player-comparison/${left.id}/${right.id}`}
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
