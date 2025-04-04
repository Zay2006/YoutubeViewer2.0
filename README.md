# 🎯 FocusTube - Modern YouTube Viewer

## 📌 Overview

FocusTube is a modern, distraction-free YouTube viewer built with Next.js and Tailwind CSS. The application provides a clean interface for watching videos and playlists while maintaining essential features like video recommendations and theme customization.

## 🚀 Features

- **Clean Interface**: Minimalist design that focuses on the video content
- **Video & Playlist Support**: Watch individual videos or entire YouTube playlists
- **Grid Layout**: Responsive CSS Grid layout with main video and recommended section
- **Video Information**: Display of video title, views, and description
- **Recommended Videos**: Curated list of related videos
- **Theme Toggle**: Light and dark mode support with system preference detection
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS

## 🛠️ Technical Implementation

### Components Structure

- `page.tsx`: Main application page with layout and video player
- `VideoCard.tsx`: Reusable component for video thumbnails
- `useYoutubeData.ts`: Custom hook for managing video data

### Layout Features

- CSS Grid for responsive layout
- Main video section (2/3 width on desktop)
- Recommended videos sidebar (1/3 width on desktop)
- Responsive design for mobile devices

### Video Player Features

- Embedded YouTube player with minimal branding
- Support for both single videos and playlists
- Video metadata display (title, views, description)
- Easy video switching through recommendations
- Flexible URL input supporting:
  - Regular videos: `youtube.com/watch?v=VIDEO_ID`
  - Playlists: `youtube.com/playlist?list=PLAYLIST_ID`
  - Videos in playlists: `youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID`

## 📦 Technologies Used

- **Next.js 14**: React framework for production
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **Heroicons**: Modern icon set
- **YouTube Embed API**: Video playback

## 🔍 Code Documentation

### TypeScript Files
- `page.tsx`: Main page component with layout and state management
- `VideoCard.tsx`: Reusable video card component with TypeScript interfaces
- `useYoutubeData.ts`: Custom hook for video data management

### CSS/Styling
- Tailwind CSS classes for responsive design
- Dark mode support with CSS variables
- Grid layout for optimal content organization

## ✅ Project Requirements Met

- [x] Improved layout using CSS Grid
- [x] Main video section with proper spacing
- [x] Recommended videos section (4-5 videos)
- [x] Video attributes display (title, views, description)
- [x] Modern UI with Tailwind CSS
- [x] TypeScript for type safety
- [x] Responsive design for all devices
- [x] Dark/Light theme toggle
- [x] Code documentation and comments
- [x] HTML5 semantic elements
- [x] Clean project structure

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open http://localhost:3000

## 📝 Notes

- The application uses mock data for recommendations (in a production environment, this would use the YouTube API)
- Theme preference is persisted in localStorage
- The layout is fully responsive and adapts to different screen sizes
