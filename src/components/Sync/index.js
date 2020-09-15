import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as messagesActions, KEY } from '../../store/ducks/messages';

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

const mapDispatchToProps = (dispatch) => bindActionCreators(messagesActions, dispatch);

export default connect(null, mapDispatchToProps)(Sync);
