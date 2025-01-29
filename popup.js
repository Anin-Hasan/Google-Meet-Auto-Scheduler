document.addEventListener("DOMContentLoaded", () => {
  let editingId = null;
  const meetingList = document.getElementById("meetingList");
  const meetingLink = document.getElementById("meetingLink");
  const meetingName = document.getElementById("meetingName");
  const meetingTime = document.getElementById("meetingTime");
  const saveButton = document.getElementById("saveMeeting");

  chrome.storage.local.get(["meetings"], ({ meetings = [] }) => {
    renderMeetings(meetings);
  });

  saveButton.addEventListener("click", () => {
    const meeting = {
      id: Date.now().toString(),
      name: document.getElementById("meetingName").value || "Untitled Meeting",
      link: meetingLink.value,
      time: new Date(meetingTime.value).getTime(),
      displayTime: meetingTime.value,
    };

    if (!meeting.link || !meeting.time) {
      alert("Please fill all fields");
      return;
    }

    chrome.storage.local.get(["meetings"], ({ meetings = [] }) => {
      if (editingId) {
        const index = meetings.findIndex((m) => m.id === editingId);
        meetings[index] = meeting;
        editingId = null;
      } else {
        meetings.push(meeting);
      }

      chrome.storage.local.set({ meetings }, () => {
        chrome.alarms.create(meeting.id, { when: meeting.time });
        renderMeetings(meetings);
        clearForm();
      });
    });
  });

  function renderMeetings(meetings) {
    const now = Date.now();

    meetingList.innerHTML = meetings
      .map(
        (meeting) => `
        <div class="meeting-item ${
          meeting.time < now ? "past-meeting" : ""
        }" data-id="${meeting.id}">
            <div class="meeting-info">
                <div class="meeting-name">${meeting.name}</div>
                <div>${new Date(meeting.time).toLocaleString()}</div>
                <div class="meeting-link">${meeting.link}</div>
            </div>
            <div class="meeting-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `
      )
      .join("");

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest(".meeting-item").dataset.id;
        editMeeting(id);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest(".meeting-item").dataset.id;
        deleteMeeting(id);
      });
    });
  }

  function editMeeting(id) {
    chrome.storage.local.get(["meetings"], ({ meetings }) => {
      const meeting = meetings.find((m) => m.id === id);
      if (meeting) {
        document.getElementById("meetingName").value = meeting.name;
        meetingLink.value = meeting.link;
        meetingTime.value = new Date(meeting.time).toISOString().slice(0, 16);
        editingId = id;
      }
    });
  }

  function deleteMeeting(id) {
    chrome.storage.local.get(["meetings"], ({ meetings }) => {
      const filtered = meetings.filter((m) => m.id !== id);
      chrome.storage.local.set({ meetings: filtered }, () => {
        chrome.alarms.clear(id);
        renderMeetings(filtered);
      });
    });
  }

  function clearForm() {
    meetingName.value = "";
    meetingLink.value = "";
    meetingTime.value = "";
    saveButton.textContent = "Schedule Meeting";
  }
});
