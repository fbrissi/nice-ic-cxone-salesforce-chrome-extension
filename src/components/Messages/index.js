import React, { useCallback, useEffect } from 'react';
import { get, map, size } from 'lodash';
import './style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as messagesActions } from '../../store/ducks/messages';
import LocalPropTypes from '../prop-types/LocalPropTypes';
import parseMessage from '../../services/message';

const Messages = (props) => {
  const {
    messages,
    setMessages,
  } = props;

  const messageListener = useCallback((request, sender, sendResponse) => {
    if (request.target === 'contet' && request.type === 'NOTIFIER') {
      console.log(request.data);
      setMessages(parseMessage(messages, request.data));

      sendResponse({
        status: true,
      });
    }

    return true;
  }, [messages]);

  const copyToClipboard = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && browser.runtime) {
      browser.runtime.onMessage.addListener(messageListener);

      return () => browser.runtime.onMessage.removeListener(messageListener);
    }

    return () => {
    };
  }, [messageListener]);

  return (
    <section>
      {
        map(messages, (message, keyDate) => (
          <div
            key={keyDate.toString()}
            className="time-entries-list"
          >
            <div className="time-entries-list-time">
              <span className="time-entries-list-day">
                {get(message, 'date')}
              </span>
              <div className="time-entries-total-and-time">
                <span className="time-entries-list-total">Total:</span>
                <span className="time-entries-list-total-time">
                  {size(get(message, 'itens'))}
                </span>
              </div>
            </div>
            {
              map(get(message, 'itens'), (item, keyItens) => (
                <div
                  key={`${keyDate}-${keyItens}`}
                  className="time-entry"
                  title={get(item, 'description')}
                >
                  <div className="time-entry-description">
                    <div className="time-entry__right-side">
                      <div className="description">
                        {get(item, 'time')}
                      </div>
                    </div>
                    <div className="time-entry__right-side">
                      <span
                        className="time-entry-arrow"
                        onClick={() => copyToClipboard(get(item, 'name'))}
                        aria-hidden="true"
                      />
                      <div className="description">
                        {get(item, 'name')}
                      </div>
                    </div>
                    <div className="time-entry__right-side">
                      <span
                        className="time-entry-arrow"
                        onClick={() => copyToClipboard(get(item, 'phone'))}
                        aria-hidden="true"
                      />
                      <div className="description">
                        {get(item, 'phone')}
                      </div>
                    </div>

                    <div
                      className="time-entry-project"
                      style={{ color: 'rgb(255, 193, 7)' }}
                    >
                      <span
                        className="time-entry-arrow"
                        onClick={() => copyToClipboard(get(item, 'number'))}
                        aria-hidden="true"
                      />
                      <div className="time-entry__project-wrapper">
                        <span className="time-entry__project-name">
                          {get(item, 'number')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }
    </section>
  );
};

Messages.propTypes = {
  messages: LocalPropTypes.messages.isRequired,
  setMessages: PropTypes.func,
};

Messages.defaultProps = {
  setMessages: () => {
  },
};

const mapDispatchToProps = (dispatch) => bindActionCreators(messagesActions, dispatch);

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
