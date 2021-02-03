import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from '../components/Dashboard';
import Settings from '../components/Settings/page';

const Root = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location}>
        <Route
          exact
          path="/index.html"
        >
          <Dashboard />
        </Route>
        <Route
          exact
          path="/settings"
        >
          <Settings />
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default Root;
