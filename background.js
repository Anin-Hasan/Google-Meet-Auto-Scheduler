// background.js
chrome.alarms.onAlarm.addListener(async (alarm) => {
  const { meetings = [] } = await chrome.storage.local.get(["meetings"]);
  const meeting = meetings.find((m) => m.id === alarm.name);

  if (meeting) {
    chrome.tabs.create({ url: meeting.link }, (tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const joinButtonSelector = ".UywwFc-RLmnJb";
          const attemptJoin = () => {
            const joinButton = document.querySelector(joinButtonSelector);
            if (joinButton) {
              setTimeout(() => {
                joinButton.click();
              }, 8000);
              return true;
            }
            return false;
          };

          if (!attemptJoin()) {
            new MutationObserver(attemptJoin).observe(document.body, {
              childList: true,
              subtree: true,
            });
          }
        },
      });
    });
  }
});
