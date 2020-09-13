import React, { useState } from 'react';
import { map } from 'lodash';
import links from './links.json';
import './style.css';

const Settings = () => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div
        className="actions"
        title="Settings"
        onClick={() => setActive(!active)}
        aria-hidden="true"
      />
      {
        active ? (
          <div className="modal">
            <div className="rectangle" />
            <div className="dropdown-menu">
              <div className="dropdown-header">LINKS ÚTEIS:</div>
              {
                map(links, (value, key) => (
                  <a
                    className="dropdown-item active"
                    href={value}
                  >
                    <span>{key}</span>
                  </a>
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
