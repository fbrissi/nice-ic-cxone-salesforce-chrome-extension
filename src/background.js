import parseMessage from './services/message';
import { KEY } from './store/ducks/messages';

(() => {
  window.browser = chrome;

  browser.runtime.onMessage.addListener((request) => {
    if (request.target === 'background') {
      const oldMessages = JSON.parse(localStorage.getItem(KEY) || '[]');
      const messages = parseMessage(oldMessages, request.data);
      localStorage.setItem(KEY, JSON.stringify(messages));
    }

    return true;
  });
})();
