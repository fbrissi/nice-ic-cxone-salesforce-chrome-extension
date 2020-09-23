import React from 'react';
import './style.css';
import Settings from '../Settings';
import Messages from '../Messages';
import Trash from '../Trash';
import Sync from '../Sync';
import Item from '../Item';
import Header from '../Header';

const App = () => (
  <div className="content">
    <Header>
      {
        process.env.NODE_ENV === 'development' ? (
          <Item />
        ) : null
      }
      <Sync />
      <Trash />
      <Settings />
    </Header>

    <Messages />
  </div>
);

export default App;
