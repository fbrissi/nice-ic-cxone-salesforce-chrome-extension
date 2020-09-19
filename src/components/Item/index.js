import React from 'react';
import './style.css';
import { getStorage, KEY, parseMessage } from '../../services/message';

const Item = () => {
  const addMessage = async (request) => {
    const oldMessages = await getStorage();
    const messages = parseMessage(oldMessages, request.data);
    localStorage.setItem(KEY, JSON.stringify(messages));
  };

  return (
    <button
      type="button"
      className="header-item"
      aria-label="Clean"
      onClick={() => addMessage({
        target: 'contet',
        type: 'NOTIFIER',
        data: {
          id: '123456',
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

export default Item;
