import React, { useEffect, useState } from 'react';
import { get, map } from 'lodash';
import { RiListSettingsFill } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import './style.css';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import LocalPropTypes from '../prop-types/LocalPropTypes';

const Settings = (props) => {
  const {
    settings,
  } = props;

  const [active, setActive] = useState(false);

  const history = useHistory();

  const [links, setLinks] = useState(get(settings, 'links'));

  useEffect(() => {
    setLinks(get(settings, 'links'));
  }, [settings]);

  const openLink = (link) => {
    if (process.env.NODE_ENV === 'production') {
      browser.tabs.create({ url: link });
    }
  };

  return (
    <div>
      <RiListSettingsFill
        size={22}
        className="icon-button margin-button"
        aria-label="Settings"
        onClick={() => setActive(!active)}
      />
      {
        active ? (
          <div className="modal">
            <div
              className="invisible-menu"
              onClick={() => setActive(!active)}
              aria-hidden="true"
            />
            <div className="rectangle" />
            <div className="dropdown-menu">
              <button
                type="button"
                className="dropdown-item active"
                onClick={() => history.push('/settings')}
              >
                <FiSettings size={20} />
                <span className="margin-button">
                  <FormattedMessage id="menu.settings" />
                </span>
              </button>
              <div className="dropdown-divider" />
              <div className="dropdown-header">LINKS ÚTEIS:</div>
              {
                map(links, (value, index) => (
                  <button
                    key={index}
                    type="button"
                    className="dropdown-item active"
                    onClick={() => openLink(value.url)}
                  >
                    <span>{value.title}</span>
                  </button>
                ))
              }
            </div>
          </div>
        ) : null
      }
    </div>
  );
};

Settings.propTypes = {
  settings: LocalPropTypes.settings,
};

Settings.defaultProps = {
  settings: {},
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Settings);
