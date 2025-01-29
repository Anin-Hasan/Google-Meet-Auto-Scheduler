# Auto Google Meet Scheduler Chrome Extension

## ✨ Features

- **Auto-Join Meetings**: Automatically opens and joins Google Meet calls
- **Smart Meeting List**:
  - Optional meeting names for better organization
  - Strikethrough styling for past meetings
  - Edit/Delete existing schedules
- **Intuitive UI**:
  - Clean material design interface
  - Real-time countdown for upcoming meetings
  - Visual feedback for past/active meetings
- **Cross-Platform**:
  - Works on all Chrome-based browsers (Edge, Brave, etc.)
  - Persistent storage using Chrome local storage

## Load the extension in Chrome:

- Open chrome://extensions

- Enable "Developer mode" (top-right toggle)

- Click "Load unpacked"

- Select the cloned repository folder

- Pin the extension:

- Click the puzzle icon in Chrome's toolbar

- Pin the "Auto Meet Scheduler" extension

# 🖥️ Usage
## Add a Meeting:

- Click the extension icon

- Enter meeting details:

- (Optional) Meeting name

- Google Meet URL

- Scheduled time

- Click "Schedule Meeting"

## Manage Meetings:

- Edit: Click ✏️ on any meeting card

- Delete: Click 🗑️ on any meeting card

- Past meetings automatically get crossed out

## Automatic Joining:

- Keep Chrome running in background

- Meetings will open automatically at scheduled times

- Join button clicked automatically (requires popup permissions)

# 🛠️ Technical Details
## Tech Stack
- Frontend: HTML5, CSS3, JavaScript (ES6+)

- Chrome APIs: Alarms, Storage, Scripting, Tabs

- Build: Pure Chrome Extension (no frameworks)

# 🌟 Roadmap
- Google Calendar integration

- Recurring meetings support

- Cross-browser packaging

- Meeting categories/tags

- Export/Import schedules

## ⚠️ Important Notes
- Requires Chrome 88+ (Manifest V3)

- Keep Chrome running for automatic joining

- Google Meet UI changes may require selector updates

- Does not handle Google authentication automatically

# FAQ
## ❓ Why isn't the extension joining meetings?

- Ensure Chrome is running

- Check popup blocker settings

- Verify meeting time is in future when scheduling

## ❓ How to update selectors if Google changes Meet's UI?

- Inspect the Join button in Chrome DevTools

- Update selector in background.js line 12

## 📧 Contact: aninhassan160@gmail.com
