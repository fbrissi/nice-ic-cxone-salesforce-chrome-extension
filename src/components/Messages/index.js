import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import {
  map, get, filter, size,
} from 'lodash';
import './style.css';

const Messages = () => {
  const storageKey = 'salesforce_plugin_to_familysearch';
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem(storageKey) || '[]'));

  const messageListener = useCallback((action) => {
    switch (action.type) {
      case 'NOTIFIER': {
        const now = moment().format('DD/MM/YYYY');
        const itens = [action.data, ...get(messages, now, [])];
        const $messages = [{
          date: now,
          itens,
        }, ...filter(messages, ({ date }) => date !== now)];
        setMessages($messages);

        localStorage.setItem(storageKey, JSON.stringify($messages));
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

export default Messages;
