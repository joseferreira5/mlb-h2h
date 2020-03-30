import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './components/styles/GlobalStyle';
import theme from './components/styles/theme';

import Header from './components/Header';
import Main from './components/styles/Main';
import PlayerSearch from './components/PlayerSearch';
import PlayerComparison from './components/PlayerComparison';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/" component={PlayerSearch} />
          <Route
            path="/player-comparison/:playerId"
            component={PlayerComparison}
          />
        </Switch>
      </Main>
      <Footer />
    </ThemeProvider>
  );
}
