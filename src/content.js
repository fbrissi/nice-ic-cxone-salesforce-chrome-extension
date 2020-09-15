window.browser = chrome;

const handleMutationObserver = (mutations) => {
  let id;
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const element = mutation.target;
      const description = element.textContent || element.innerText || '';

      if (id !== element.id) {
        id = element.id;

        console.log(element);

        if (description) {
          const message = {
            type: 'NOTIFIER',
            data: {
              time: '00:00:00',
              description,
              name: 'Filipe Bojikian Rissi',
              phone: '0115514991434121',
              number: '019748',
            },
          };

          browser.runtime.sendMessage(browser.runtime.id, {
            target: 'background',
            ...message,
          });
        }
      }
    }
  });
};

const target = document.getElementById('agentMsgContentPnl');

if (target) {
  const observer = new MutationObserver(handleMutationObserver);
  const config = {
    childList: true,
  };

  observer.observe(target, config);
}
