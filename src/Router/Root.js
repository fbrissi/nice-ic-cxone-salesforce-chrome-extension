import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import App from '../components/App';
import Settings from '../components/Settings/page';
import './style.css';

const Root = () => {
  const location = useLocation();

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={{
          enter: 500,
          exit: 500,
        }}
      >
        <Switch location={location}>
          <Route
            exact
            path="/index.html"
            component={App}
          />
          <Route
            exact
            path="/settings"
            component={Settings}
          />
        </Switch>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Root;
