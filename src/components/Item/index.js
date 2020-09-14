import React, { useCallback } from 'react';
import './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { filter, find, get } from 'lodash';
import { Creators as messagesActions } from '../../store/ducks/messages';
import LocalPropTypes from '../prop-types/LocalPropTypes';

const Item = (props) => {
  const {
    messages,
    setMessages,
  } = props;

  const addMessage = useCallback((action) => {
    switch (action.type) {
      case 'NOTIFIER': {
        const now = moment().format('DD/MM/YYYY');
        const message = find(messages, ({ date }) => date === now);
        const itens = [action.data, ...get(message, 'itens', [])];
        const $messages = [{
          date: now,
          itens,
        }, ...filter(messages, ({ date }) => date !== now)];
        console.log($messages);
        setMessages($messages);
        break;
      }
      default:
        break;
    }
  }, [messages]);

  return (
    <div>
      <button
        type="button"
        className="header-item"
        aria-label="Clean"
        onClick={() => addMessage({
          target: 'background',
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
    </div>
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
