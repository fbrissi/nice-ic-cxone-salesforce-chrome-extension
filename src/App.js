import React, { useCallback, useEffect, useState } from 'react';
import { map } from 'lodash';
import './assets/css/App.css';

const App = () => {
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      chrome.runtime.onMessage.addListener(messageListener);

      return () => chrome.runtime.onMessage.removeListener(messageListener);
    }

    return () => {
    };
  }, [messageListener]);

  return (
    <div className="App">
      <header className="App-header">
        <span>Últimos atendimentos realizados:</span>
        {
          map(messages, (message) => (
            <span>{message}</span>
          ))
        }
      </header>
    </div>
  );
};

export default App;
