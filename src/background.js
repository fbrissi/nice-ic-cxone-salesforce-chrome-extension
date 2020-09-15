import parseMessage from './services/message';
import { KEY } from './store/ducks/messages';

window.browser = chrome;

browser.runtime.onMessage.addListener((request) => {
  if (request.target === 'background') {
    const oldMessages = JSON.parse(localStorage.getItem(KEY) || '[]');
    const messages = parseMessage(oldMessages, request.data);
    localStorage.setItem(KEY, JSON.stringify(messages));

    browser.notifications.create(`my-notification-${Date.now()}`, {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Nova Chamada',
      message: request.data.description,
    });
  }

  return true;
});
