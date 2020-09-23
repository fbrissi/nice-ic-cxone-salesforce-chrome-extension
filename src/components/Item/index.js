import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { getMessages, KEY, parseMessage } from '../../services/messages';

const Item = () => {
  const addMessage = async (request) => {
    const oldMessages = await getMessages();
    const messages = parseMessage(oldMessages, request.data);
    localStorage.setItem(KEY, JSON.stringify(messages));
  };

  return (
    <AiOutlinePlusCircle
      size={20}
      className="icon-button margin-button"
      aria-label="Clean"
      onClick={() => addMessage({
        target: 'contet',
        type: 'NOTIFIER',
        data: {
          id: '5004V00000aefcDQAQ',
          time: '08:08',
          description: 'New Salesforce case# 07752618 **System information only** 5004V00000aefcDQAQ',
          email: 'teste@gmail.com',
          phone: '0115514999999999',
          number: '07752618',
        },
      })}
    />
  );
};

export default Item;
