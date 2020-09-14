import React from 'react';
import './style.css';
import logo from '../../assets/images/logo.png';
import Settings from '../Settings';
import Messages from '../Messages';

const App = () => {
  const openLink = (link) => {
    if (process.env.NODE_ENV === 'production') {
      chrome.tabs.create({ url: link });
    }
  };

  return (
    <div className="content">
      <header className="header-and-settings">
        <div className="header-content">
          <div className="colum-1">
            <button
              type="button"
              onClick={() => openLink('https://www.familysearch.org/pt/')}
            >
              <img
                className="logo"
                alt="Logo"
                src={logo}
              />
            </button>
          </div>
          <div className="colum-2">
            <Settings />
          </div>
        </div>
      </header>

      <Messages />
    </div>
  );
};

export default App;
