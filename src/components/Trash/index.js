import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsTrashFill } from 'react-icons/bs';
import { Creators as messagesActions } from '../../store/ducks/messages';
import { cleanMessages } from '../../services/messages';

const Trash = (props) => {
  const {
    setMessages,
  } = props;

  const clean = () => {
    setMessages([]);
    cleanMessages();
  };

  return (
    <BsTrashFill
      size={20}
      className="icon-button margin-button"
      aria-label="Clean"
      onClick={() => clean()}
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
