import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Root from './Root';
import { getSettings } from '../services/settings';
import { Creators as settingsActions } from '../store/ducks/settings';

const Router = (props) => {
  const {
    setSettings,
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      setSettings(await getSettings());
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Route>
        <Switch>
          <Route
            path="*"
            component={Root}
          />
        </Switch>
      </Route>
    </BrowserRouter>
  );
};

Router.propTypes = {
  setSettings: PropTypes.func,
};

Router.defaultProps = {
  setSettings: () => {
  },
};

const mapDispatchToProps = (dispatch) => bindActionCreators(settingsActions, dispatch);

export default connect(null, mapDispatchToProps)(Router);
