import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import Header from './Header';
import Main from './Main';
import Search from './Search';
import Comparison from './Comparison';
import Footer from './Footer';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Main>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Search} />
            <Route
              path="/player-comparison/:playerOneId/:playerTwoId"
              component={Comparison}
            />
          </Switch>
        </AnimatePresence>
      </Main>
      <Footer />
    </ThemeProvider>
  );
}
