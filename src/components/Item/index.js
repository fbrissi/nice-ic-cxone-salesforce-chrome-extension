import React, { useCallback } from 'react';
import './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Creators as messagesActions } from '../../store/ducks/messages';
import LocalPropTypes from '../prop-types/LocalPropTypes';
import parseMessage from '../../services/message';

const Item = (props) => {
  const {
    messages,
    setMessages,
  } = props;

  const addMessage = useCallback((request) => {
    switch (request.type) {
      case 'NOTIFIER': {
        setMessages(parseMessage(messages, request.data));
        break;
      }
      default:
        break;
    }
  }, [messages]);

  return (
    <button
      type="button"
      className="header-item"
      aria-label="Clean"
      onClick={() => addMessage({
        target: 'contet',
        type: 'NOTIFIER',
        data: {
          time: '00:00:00',
          description: 'TESTE',
          name: 'Filipe Bojikian Rissi',
          phone: '0115514991434121',
          number: '019748',
        },
      })}
    />
  );
};

Item.propTypes = {
  messages: LocalPropTypes.messages.isRequired,
  setMessages: PropTypes.func,
};

Item.defaultProps = {
  setMessages: () => {
  },
};

const mapDispatchToProps = (dispatch) => bindActionCreators(messagesActions, dispatch);

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
