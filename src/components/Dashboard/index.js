import React from 'react';
import { motion } from 'framer-motion';
import './style.css';
import Settings from '../Settings';
import Messages from '../Messages';
import Trash from '../Trash';
import Sync from '../Sync';
import Item from '../Item';
import Header from '../Header';

const App = () => (
  <motion.div
    className="content"
    exit={{
      x: 100,
      opacity: 0,
    }}
    initial={{
      x: -100,
      opacity: 0,
    }}
    animate={{
      x: 0,
      opacity: 1,
    }}
  >
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
  </motion.div>
);

export default App;
