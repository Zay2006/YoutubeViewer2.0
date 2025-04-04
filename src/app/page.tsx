'use client'

import { useState, useEffect } from 'react'
import VideoCard from '@/components/VideoCard'
import { useYoutubeData } from '@/hooks/useYoutubeData'
import ThemeToggle from '@/components/ThemeToggle'

const extractVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ''
}

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const videoId = extractVideoId(videoUrl)
  const { mainVideo, recommendedVideos } = useYoutubeData(videoId)

  useEffect(() => {
    // Load user theme preference if exists
    const userProfile = localStorage.getItem('user_profile')
    if (userProfile) {
      const { theme } = JSON.parse(userProfile)
      document.documentElement.className = theme
    }
  }, [])

  const handleLoadVideo = () => {
    // Video ID is automatically extracted via the videoId variable
    setVideoUrl(videoUrl.trim())
  }

  const handleVideoSelect = (id: string) => {
    setVideoUrl(`https://www.youtube.com/watch?v=${id}`)
  }

  return (
    <main className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <nav className="nav-bar sticky top-0 z-50 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-primary">FocusTube</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter YouTube URL or Video ID"
                className="p-2 pl-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={handleLoadVideo}
                className="absolute right-1 top-1 px-3 py-1 bg-primary text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
              >
                Load
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto grid gap-6">
        {/* Main video section */}
        <section className="grid grid-cols-1 gap-6">
          <div className="w-full">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              {videoId && (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
            {mainVideo && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">{mainVideo.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{mainVideo.views} views</p>
                <p className="text-gray-700 dark:text-gray-300">{mainVideo.description}</p>
              </div>
            )}
          </div>

          {/* Recommended videos */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recommended Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  {...video}
                  onSelect={handleVideoSelect}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
