chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "joinMeeting") {
    const { meetingLink } = await chrome.storage.local.get("meetingLink");

    chrome.tabs.create({ url: meetingLink }, (tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const attemptJoin = () => {
            const joinButton = document.querySelector(".UywwFc-RLmnJb");
            if (joinButton) {
              setTimeout(() => {
                joinButton.click();
              }, 5000);
              return true;
            }
            return false;
          };

          if (!attemptJoin()) {
            const observer = new MutationObserver(attemptJoin);
            observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
          }
        },
      });
    });
  }
});
