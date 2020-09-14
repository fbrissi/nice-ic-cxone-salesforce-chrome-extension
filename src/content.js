const handleMutationObserver = (mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const element = mutation.target;
      const message = element.textContent || element.innerText || '';

      if (message && chrome.runtime) {
        chrome.runtime.sendMessage(chrome.runtime.id, {
          target: 'background',
          type: 'NOTIFIER',
          data: {
            time: '00:00:00',
            description: message,
            name: 'Filipe Bojikian Rissi',
            phone: '0115514991434121',
            number: '019748',
          },
        });

        console.log(element);
      }
    }
  });
};

const target = document.getElementById('agentMsgContentPnl');
console.log(target);

if (target) {
  const observer = new MutationObserver(handleMutationObserver);
  const config = {
    childList: true,
  };

  observer.observe(target, config);
}
