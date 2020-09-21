import React, { useEffect } from 'react';
import { get, map, size } from 'lodash';
import './style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { MdOpenInNew } from 'react-icons/md';
import { FaCopy } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { HiMail } from 'react-icons/hi';
import { AiOutlineNumber, AiFillPhone } from 'react-icons/ai';
import { Creators as messagesActions } from '../../store/ducks/messages';
import LocalPropTypes from '../prop-types/LocalPropTypes';
import { getStorage } from '../../services/message';

const Messages = (props) => {
  const {
    messages,
    setMessages,
  } = props;

  const copyToClipboard = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      setMessages(await getStorage());
    };

    fetchData();
  }, []);

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
                >
                  <div className="time-entry-description">
                    <div className="time-entry__right-side">
                      <BiTime />
                      <div className="description">
                        {get(item, 'time')}
                      </div>
                    </div>

                    <div className="time-entry__right-side">
                      <HiMail />
                      <div className="description">
                        {get(item, 'email')}
                      </div>
                      <FaCopy
                        className="icon-button"
                        onClick={() => copyToClipboard(get(item, 'email'))}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="time-entry__right-side">
                      <AiFillPhone />
                      <div className="description">
                        {get(item, 'phone')}
                      </div>
                      <FaCopy
                        className="icon-button"
                        onClick={() => copyToClipboard(get(item, 'phone'))}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="time-entry__right-side">
                      <AiOutlineNumber />
                      <div className="time-entry__project-wrapper">
                        <span className="time-entry__project-name">
                          {get(item, 'number')}
                        </span>
                      </div>
                      <MdOpenInNew
                        className="icon-button"
                        aria-hidden="true"
                      />
                      <FaCopy
                        className="icon-button margin-icon"
                        onClick={() => copyToClipboard(get(item, 'number'))}
                        aria-hidden="true"
                      />
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
