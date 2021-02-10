import { getSettings } from './services/settings';

browser.runtime.onMessage.addListener(async (request) => {
  if (request.target === 'popup' && request.type === 'OPEN-CASE') {
    const execute = `function () {if(typeof srcUp === "function") srcUp(encodeURI('/${request.data.id}?srPos=0&srKp=500&isdtp=vw'));}`;
    const script = document.createElement('script');
    script.onload = () => this.remove();
    script.appendChild(document.createTextNode(`(${execute})();`));
    (document.body || document.head || document.documentElement).appendChild(script);
  }
});

Array.from(document.getElementsByClassName('tel')).forEach((element) => {
  Array.from(element.nextSibling.getElementsByTagName('a')).forEach(async (call) => {
    const onclick = call.getAttribute('onclick');
    const regex = /encodeURIComponent\('(?<phone>[\d\W]+)'\)/gi.exec(onclick);
    if (regex) {
      const { groups: { phone } } = regex;
      const number = phone.match(/\d+/g).join('');
      const setting = await getSettings();

      if (setting && setting.call && setting.call.prefix
        && !number.startsWith(setting.call.prefix)) {
        call.setAttribute('onclick', onclick
          .replace(`encodeURIComponent('${phone}')`,
            `encodeURIComponent('${setting.call.prefix}${number}')`));
      } else {
        call.setAttribute('onclick', onclick
          .replace(`encodeURIComponent('${phone}')`,
            `encodeURIComponent('${number}')`));
      }
    }
  });
});
