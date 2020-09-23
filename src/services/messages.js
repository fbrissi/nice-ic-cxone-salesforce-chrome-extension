import { cleanStorage, getStorage } from './storage';

export const KEY = 'nice_ic_cxone_salesforce_messages';

export const getMessages = async () => getStorage(KEY);

export const cleanMessages = async () => cleanStorage(KEY);

export const parseMessage = (messages = [], data = {}) => {
  const now = new Date().toISOString()
    .substr(0, 10)
    .split('-')
    .reverse()
    .join('/');
  const message = messages.find(({ date }) => date === now) || { itens: [] };
  const itens = [data, ...message.itens];

  return [{
    date: now,
    itens,
  }, ...messages.filter(({ date }) => date !== now)];
};
