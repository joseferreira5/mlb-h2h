import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import GlobalStyle from './components/styles/GlobalStyle';
import theme from './components/styles/theme';

import Header from './components/Header';
import Main from './components/styles/Main';
import PlayerSearch from './components/PlayerSearch';
import PlayerComparison from './components/PlayerComparison';
import Footer from './components/Footer';

export default function App() {
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Main>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={PlayerSearch} />
            <Route
              path="/player-comparison/:playerOneId/:playerTwoId"
              component={PlayerComparison}
            />
          </Switch>
        </AnimatePresence>
      </Main>
      <Footer />
    </ThemeProvider>
  );
}
