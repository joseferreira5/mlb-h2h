import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider as StoreProvider } from 'react-redux';

import Header from './Header';
import Main from './Main';
import Search from './Search';
import Comparison from './Comparison';
import Footer from './Footer';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import rootReducer from './store';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const location = useLocation();

  return (
    <StoreProvider store={store}>
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
    </StoreProvider>
  );
}
