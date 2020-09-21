browser.runtime.onMessage.addListener(async (request) => {
  if (request.target === 'popup' && request.type === 'OPEN-CASE') {
    const execute = `function () {if(typeof srcUp === "function") srcUp(encodeURI('/${request.data.id}?srPos=0&srKp=500&isdtp=vw'));}`;
    const script = document.createElement('script');
    script.onload = () => this.remove();
    script.appendChild(document.createTextNode(`(${execute})();`));
    (document.body || document.head || document.documentElement).appendChild(script);
  }
});
