import React, { useEffect } from 'react';
import { get } from 'lodash';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IntlProvider } from 'react-intl';
import Root from './Root';
import { getSettings } from '../services/settings';
import { Creators as settingsActions } from '../store/ducks/settings';
import messages from '../i18n';
import LocalPropTypes from '../components/prop-types/LocalPropTypes';
import store from '../store';

const App = (props) => {
  const {
    settings,
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      store.dispatch(settingsActions.setSettings(await getSettings()));
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <IntlProvider
        defaultLocale="en-US"
        locale={get(settings, 'language', 'en-US')}
        messages={get(messages, get(settings, 'language', 'en-US'))}
      >
        <Route>
          <Switch>
            <Route path="*">
              <Root />
            </Route>
          </Switch>
        </Route>
      </IntlProvider>
    </BrowserRouter>
  );
};

App.propTypes = {
  settings: LocalPropTypes.settings,
};

App.defaultProps = {
  settings: {},
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(settingsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
