export const KEY = 'familysearch_salesforce_plugin';

export const getStorage = async () => {
  if (process.env.NODE_ENV === 'production') {
    return (await browser.storage.local.get(KEY))[KEY] || [];
  }

  return JSON.parse(localStorage.getItem(KEY) || '[]');
};

export const cleanStorage = () => {
  if (process.env.NODE_ENV === 'production') {
    return browser.storage.local.set({ [KEY]: [] });
  }

  return localStorage.setItem(KEY, '');
};

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
