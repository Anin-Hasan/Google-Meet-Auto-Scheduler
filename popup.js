// popup.js
document.getElementById("schedule").addEventListener("click", () => {
  const link = document.getElementById("meetingLink").value;
  const time = new Date(document.getElementById("meetingTime").value).getTime();

  chrome.alarms.create("joinMeeting", {
    when: time,
  });

  chrome.storage.local.set({ meetingLink: link });
});