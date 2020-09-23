import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AiOutlineReload } from 'react-icons/ai';
import { Creators as messagesActions } from '../../store/ducks/messages';
import { getMessages } from '../../services/messages';

const Sync = (props) => {
  const {
    setMessages,
  } = props;

  const syncMessages = async () => {
    setMessages(await getMessages());
  };

  return (
    <AiOutlineReload
      size={20}
      className="icon-button margin-button"
      aria-label="Refresh"
      onClick={() => syncMessages()}
    />
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
