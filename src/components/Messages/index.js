import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { map, get, size } from 'lodash';
import './style.css';

const Messages = () => {
  const [messages, setMessages] = useState([{
    date: moment().format('DD/MM/YYYY'),
    itens: [{
      description: 'Hora: 00:00, Nome: teste, Caso: 9878987, Telefone: 23784924',
      name: 'Filipe Bojikian Rissi',
      phone: '0115514991434121',
      number: '019748',
    }, {
      description: 'Hora: 00:00, Nome: teste, Caso: 9878987, Telefone: 23784924',
      name: 'Filipe Bojikian Rissi',
      phone: '0115514991434121',
      number: '019748',
    }],
  },{
    date: moment().format('DD/MM/YYYY'),
    itens: [{
      description: 'Hora: 00:00, Nome: teste, Caso: 9878987, Telefone: 23784924',
      name: 'Filipe Bojikian Rissi',
      phone: '0115514991434121',
      number: '019748',
    }, {
      description: 'Hora: 00:00, Nome: teste, Caso: 9878987, Telefone: 23784924',
      name: 'Filipe Bojikian Rissi',
      phone: '0115514991434121',
      number: '019748',
    }],
  }]);

  const messageListener = useCallback((action) => {
    switch (action.type) {
      case 'NOTIFIER': {
        setMessages([...messages, action.data]);
        break;
      }
      default:
        break;
    }
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
    if (process.env.NODE_ENV === 'production') {
      chrome.runtime.onMessage.addListener(messageListener);

      return () => chrome.runtime.onMessage.removeListener(messageListener);
    }

    return () => {
    };
  }, [messageListener]);

  return (
    <section>
      {
        map(messages, (message) => (
          <div className="time-entries-list">
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
              map(get(message, 'itens'), (item) => (
                <div className="time-entry" title={get(item, 'description')}>
                  <div className="time-entry-description">
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

export default Messages;
