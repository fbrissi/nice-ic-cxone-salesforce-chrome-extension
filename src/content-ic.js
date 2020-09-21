const handleMutationObserver = (mutations) => {
  let id;
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const element = mutation.target.querySelector('.agentMsgPnl .agentMsgSub');

      if (element) {
        const description = element.textContent || element.innerText || '';

        if (id !== element.id) {
          id = element.id;
          const timeElement = element.querySelector('.agentMsgDate');
          const otherInfoElement = element.querySelector('.agentMsgCon');
          const phoneElement = document.getElementById('phoneIDorNumberPnlId');

          const timeText = timeElement.textContent || timeElement.innerText;
          const phoneText = phoneElement ? phoneElement.textContent || phoneElement.innerText : '';
          const otherInfo = otherInfoElement.textContent || otherInfoElement.innerText;

          const sfId = otherInfo.substr(otherInfo.indexOf('only**') + 6).trim();
          const phone = phoneText;
          const time = timeText
            .replace(/\d{2}\/\d{2}\/\d{4}/g, '').trim();
          const number = otherInfo
            .substr(otherInfo.indexOf('case#'), otherInfo.indexOf('**System'))
            .replaceAll(/\D/g, '');

          if (description) {
            const message = {
              type: 'NOTIFIER',
              data: {
                id: sfId,
                time,
                description,
                phone,
                number,
              },
            };

            browser.runtime.sendMessage(browser.runtime.id, {
              target: 'content',
              ...message,
            });
          }
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
