# 🎯 FocusTube - Minimal YouTube Viewer

## 📌 Overview

FocusTube is a streamlined YouTube viewer that removes distractions to help users stay focused while watching videos. The project has gone through several iterations based on user feedback, enhancing layout, functionality, and personalization features.

---

## 🚧 Problem Statements & Project Scopes

### ✅ Phase 1: Basic YouTube Embed Page
**Problem:**  
YouTube’s default interface contains distractions that reduce focus.  
**Scope:**  
Build an HTML webpage that embeds a YouTube video, removing related content and links that cause distraction. Use HTML5 elements for structure and presentation.

---

### ✅ Phase 2: Improved Layout
**Problem:**  
User feedback showed that the initial layout was not user-friendly.  
**Scope:**  
Refactor the layout using CSS Grid. Create a main video display with a section below it for 4-5 suggested videos.

---

### ✅ Phase 3: Theme Toggle Feature
**Problem:**  
Users requested the ability to toggle between light and dark themes.  
**Scope:**  
Implement light (default) and dark themes with a toggle switch styled with icons.

---

### ✅ Phase 4: User Feedback & Theme Persistence
**Problem:**  
We need to track theme requests and retain user preferences.  
**Scope:**  
Add a popup form to collect user data (name, email, theme). Store preferences using Local Storage and restore them on page load.

---

### ✅ Phase 5: Full User Profile & Multi-Theme Support
**Problem:**  
Validated user demand for themes requires a full profile system and additional themes.  
**Scope:**  
Create a user profile form capturing name, email, password, and theme. Validate input. Add a navigation menu with "Home" and "Profile" links. Introduce 3+ new themes using radio inputs or toggle buttons.

---

## 📦 Deliverables Checklist

- [x] Reviewed the concept rubric for each phase
- [x] Created GitHub Project stories, related issues & tasks
- [x] Commented code for readability and logical flow
- [x] Uploaded the latest version of code to GitHub
- [x] Hosted project using GitHub Pages
- [x] Submitted GitHub link to Beacon
- [x] Embedded YouTube videos using `<iframe>` in `index.html`
- [x] Used HTML5 semantic elements for accessibility and structure
- [x] Applied responsive styles using CSS and Grid
- [x] Properly displayed video metadata (title, description, etc.)
- [x] Added and styled a theme toggle button (Light/Dark)
- [x] Used JavaScript for interactive functionality
- [x] Implemented Local Storage API for user preference retention
- [x] Created a form using `document.createElement()` for:
  - Name
  - Email
  - Theme selection
  - Submit button
- [x] Validated form inputs (e.g., name must be ≥ 4 characters)
- [x] Created a separate profile page loaded from local storage
- [x] Added a top navigation menu (Home, Profile)
- [x] Introduced 3 or more theme options

---

## 🧩 Technologies Used

- HTML5
- CSS Grid / Flexbox
- Vanilla JavaScript
- GitHub Pages (Hosting)
- Local Storage API

---

## 🗃️ File Documentation

All files are fully documented and follow best practices:
- ✅ `index.html`: Structured with semantic HTML5 tags
- ✅ `style.css`: Clearly commented with theme styles and layout rules
- ✅ `script.js`: Handles event logic, theme toggling, form creation, and local storage interaction
