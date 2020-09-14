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
            data: {
              time: '00:00:00',
              description: 'Hora: 00:00, Nome: teste, Caso: 9878987, Telefone: 23784924',
              name: 'Filipe Bojikian Rissi',
              phone: '0115514991434121',
              number: '019748',
            },
          });
        }
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
