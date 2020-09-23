import React, { useEffect, useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header';
import { Creators as settingsActions } from '../../store/ducks/settings';
import LocalPropTypes from '../prop-types/LocalPropTypes';

const Settings = (props) => {
  const {
    settings,
    setSettings,
  } = props;

  const history = useHistory();

  const [links, setLinks] = useState(get(settings, 'links', false));
  const [darkMode, setDarkMode] = useState(get(settings, 'darkMode'));

  useEffect(() => {
    setSettings({
      ...settings,
      darkMode,
      links,
    });
  }, [darkMode, links]);

  return (
    <div className="content-setting">
      <Header>
        <button
          type="button"
          className="header-back"
          onClick={() => history.push('/')}
        >
          Voltar
        </button>
      </Header>

      <div className="settings-page">
        <label
          className="settings-page-item"
          htmlFor="material-switch"
        >
          <Switch
            id="material-switch"
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            uncheckedIcon={false}
            checkedIcon={false}
            checked={darkMode}
            onChange={(checked) => setDarkMode(checked)}
          />
          <span className="settings-page-item-margin">Dark Mode</span>
        </label>
        <label
          className="settings-page-item settings-page-item-title"
          htmlFor="links"
        >
          <span>Links</span>
        </label>
        <textarea
          id="links"
          className="settings-page-item"
          value={JSON.stringify(links)}
          onChange={(event) => setLinks(JSON.parse(event.target.value))}
        />
      </div>
    </div>
  );
};

Settings.propTypes = {
  settings: LocalPropTypes.settings,
  setSettings: PropTypes.func,
};

Settings.defaultProps = {
  settings: {},
  setSettings: () => {
  },
};

const mapDispatchToProps = (dispatch) => bindActionCreators(settingsActions, dispatch);

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
