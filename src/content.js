(() => {
  const handleMutationObserver = (mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const element = document.getElementById('agentMsgContentPnl');
        const message = element.textContent || element.innerText || '';

        if (message) {
          chrome.runtime.sendMessage(chrome.runtime.id, {
            target: 'background',
            type: 'NOTIFIER',
            data: message,
          });
        }

        console.log(element);
      }
    });
  };

  const target = document.querySelector('.agentConsole');

  if (target) {
    const observer = new MutationObserver(handleMutationObserver);
    const config = {
      childList: true,
    };

    observer.observe(target, config);
  }
}).call();
