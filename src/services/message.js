import moment from 'moment';
import { filter, find, get } from 'lodash';

const parseMessage = (messages, data) => {
  const now = moment().format('DD/MM/YYYY');
  const message = find(messages, ({ date }) => date === now);
  const itens = [data, ...get(message, 'itens', [])];

  return [{
    date: now,
    itens,
  }, ...filter(messages, ({ date }) => date !== now)];
};

export default parseMessage;
