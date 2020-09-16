import React from 'react';
import './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Creators as messagesActions } from '../../store/ducks/messages';

const Trash = (props) => {
  const {
    setMessages,
  } = props;

  return (
    <button
      type="button"
      className="header-trash"
      aria-label="Clean"
      onClick={() => setMessages([])}
    />
  );
};

Trash.propTypes = {
  setMessages: PropTypes.func,
};

Trash.defaultProps = {
  setMessages: () => {
  },
};

const mapDispatchToProps = (dispatch) => bindActionCreators(messagesActions, dispatch);

export default connect(null, mapDispatchToProps)(Trash);
