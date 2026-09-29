# FocusTube

A distraction-free YouTube viewer built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Watch a video or playlist from a YouTube URL or an 11-character video ID
- Supported links include `watch`, `youtu.be`, `shorts`, `embed`, `live`, and playlist URLs
- Desktop layout keeps the player beside a list of recommended videos
- Light, dark, ocean, purple, and green themes
- The first visit follows the system light or dark preference, then the choice is remembered
- Profile and settings share one saved preference record
- Autoplay is applied the next time a video is loaded

## Getting started

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open http://localhost:3000

`npm test` checks the URL parser and saved preferences. `npm run lint` runs ESLint.

## Notes

- Titles and channel names for the current video come from YouTube's oEmbed endpoint. View counts, durations, and descriptions in the catalog are static placeholders.
- Preferences are stored in `localStorage` under `focustube_preferences`. Passwords are not collected or stored.
- Older `theme`, `user_settings`, and `user_profile` values are migrated once. A password saved by an earlier version is deleted and not copied into the new record.
