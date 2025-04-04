import { useState, useEffect } from 'react'

// Mock data for demonstration (in a real app, this would come from YouTube API)
const MOCK_VIDEOS = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '3:32',
    views: '1.2B',
    description: 'The classic music video that started it all...'
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Me at the zoo',
    thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    duration: '0:18',
    views: '258M',
    description: 'The first video on YouTube'
  },
  {
    id: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE',
    thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    duration: '4:12',
    views: '4.6B',
    description: 'The most-viewed video of all time'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    duration: '4:41',
    views: '8.1B',
    description: 'The second most-viewed video of all time'
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Ed Sheeran - Shape of You',
    thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg',
    duration: '4:23',
    views: '5.9B',
    description: 'One of the most popular music videos'
  }
]

export interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  description: string
}

export function useYoutubeData(currentVideoId?: string) {
  const [mainVideo, setMainVideo] = useState<Video | null>(null)
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([])

  useEffect(() => {
    if (currentVideoId) {
      // Find the main video
      const main = MOCK_VIDEOS.find(v => v.id === currentVideoId) || MOCK_VIDEOS[0]
      setMainVideo(main)

      // Get recommended videos (excluding the main video)
      const recommended = MOCK_VIDEOS
        .filter(v => v.id !== currentVideoId)
        .slice(0, 4)
      setRecommendedVideos(recommended)
    } else {
      // Default to first video as main
      setMainVideo(MOCK_VIDEOS[0])
      setRecommendedVideos(MOCK_VIDEOS.slice(1, 5))
    }
  }, [currentVideoId])

  return { mainVideo, recommendedVideos }
}
