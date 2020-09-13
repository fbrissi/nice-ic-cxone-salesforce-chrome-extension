import React from 'react';
import './style.css';
import logo from '../../assets/images/logo.png';
import Settings from '../Settings';
import Messages from '../Messages';

const App = () => (
  <div className="content">
    <header className="header-and-settings">
      <div className="header-content">
        <div className="colum-1">
          <a href="https://www.familysearch.org/pt/">
            <img
              className="logo"
              alt="Logo"
              src={logo}
            />
          </a>
        </div>
        <div className="colum-2">
          <Settings />
        </div>
      </div>
    </header>

    <Messages />
  </div>
);

export default App;
