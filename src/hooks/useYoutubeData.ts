import { useState, useEffect } from 'react'

export interface VideoData {
  id: string
  title: string
  thumbnail: string
  views: string
  duration: string
  channel?: string
}

const SAMPLE_VIDEOS: Record<string, VideoData[]> = {
  // Gaming category
  gaming: [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Top Gaming Moments 2025',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      views: '2.1M views',
      duration: '12:45',
      channel: 'Gaming Central'
    },
    {
      id: 'ZZ5LpwO-An4',
      title: 'Pro Gaming Tips & Tricks',
      thumbnail: 'https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg',
      views: '890K views',
      duration: '8:30',
      channel: 'Pro Gaming'
    }
  ],
  // Music category
  music: [
    {
      id: 'y6120QOlsfU',
      title: 'New Music Hits 2025',
      thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg',
      views: '3.2M views',
      duration: '15:20',
      channel: 'Music Now'
    },
    {
      id: '9bZkp7q19f0',
      title: 'Top Charts Compilation',
      thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
      views: '1.5M views',
      duration: '10:15',
      channel: 'Music Charts'
    }
  ],
  // Technology category
  tech: [
    {
      id: 'M7lc1UVf-VE',
      title: 'Latest Tech Reviews 2025',
      thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
      views: '950K views',
      duration: '18:30',
      channel: 'Tech Review'
    },
    {
      id: 'rfscVS0vtbw',
      title: 'Programming Tutorial',
      thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
      views: '750K views',
      duration: '25:45',
      channel: 'Code Master'
    }
  ]
}

export function useYoutubeData(videoId: string) {
  const [mainVideo, setMainVideo] = useState<VideoData | null>(null)
  const [recommendedVideos, setRecommendedVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!videoId) {
      setMainVideo(null)
      setRecommendedVideos([])
      return
    }

    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      // Update main video
      setMainVideo({
        id: videoId,
        title: `Video ${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        views: `${Math.floor(Math.random() * 900 + 100)}K views`,
        duration: `${Math.floor(Math.random() * 10 + 5)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        channel: 'Channel Name'
      })

      // Get random category for recommendations
      const categories = Object.keys(SAMPLE_VIDEOS)
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      
      // Get recommendations
      const recommendations = SAMPLE_VIDEOS[randomCategory]
        .filter(video => video.id !== videoId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)

      setRecommendedVideos(recommendations)
      setLoading(false)
    }, 500)
  }, [videoId])

  return { mainVideo, recommendedVideos, loading }
}
