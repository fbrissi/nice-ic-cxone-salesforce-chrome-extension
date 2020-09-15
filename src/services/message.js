const parseMessage = (messages = [], data = {}) => {
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

export default parseMessage;
