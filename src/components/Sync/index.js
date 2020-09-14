import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { KEY } from '../../store/ducks/messages';

const Sync = (props) => {
  const {
    setMessages,
  } = props;

  return (
    <div>
      <button
        type="button"
        className="header-sync"
        aria-label="Refresh"
        onClick={() => setMessages(JSON.parse(localStorage.getItem(KEY) || '[]'))}
      />
    </div>
  );
};

Sync.propTypes = {
  setMessages: PropTypes.func,
};

Sync.defaultProps = {
  setMessages: () => {
  },
};

export default Sync;
