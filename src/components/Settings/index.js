import React, { useState } from 'react';
import { map } from 'lodash';
import links from './links.json';
import './style.css';

const Settings = () => {
  const [active, setActive] = useState(false);

  const openLink = (link) => {
    if (process.env.NODE_ENV === 'production') {
      browser.tabs.create({ url: link });
    }
  };

  return (
    <div>
      <button
        type="button"
        className="actions"
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
              <div className="dropdown-header">LINKS ÚTEIS:</div>
              {
                map(links, (value, key) => (
                  <button
                    key={key}
                    type="button"
                    className="dropdown-item active"
                    onClick={() => openLink(value)}
                  >
                    <span>{key}</span>
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

export default Settings;
