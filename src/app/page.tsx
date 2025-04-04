'use client'

import { useState } from 'react'
import VideoCard from '@/components/VideoCard'
import { useYoutubeData } from '@/hooks/useYoutubeData'

interface YouTubeParams {
  videoId?: string;
  playlistId?: string;
}

/**
 * Extracts video ID and playlist ID from a YouTube URL
 * Supports formats:
 * - youtube.com/watch?v=VIDEO_ID
 * - youtu.be/VIDEO_ID
 * - youtube.com/playlist?list=PLAYLIST_ID
 * - youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
 */
const extractYouTubeParams = (url: string): YouTubeParams => {
  const videoRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const playlistRegExp = /[?&]list=([^#\&\?]*)/

  const videoMatch = url.match(videoRegExp)
  const playlistMatch = url.match(playlistRegExp)

  const videoId = videoMatch?.[2]
  const playlistId = playlistMatch?.[1]

  return {
    videoId: videoId?.length === 11 ? videoId : undefined,
    playlistId: playlistId || undefined
  }
}

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const { videoId, playlistId } = extractYouTubeParams(videoUrl)
  const { mainVideo, recommendedVideos, loading } = useYoutubeData(videoId || '')

  const handleLoadVideo = () => {
    const trimmedUrl = videoUrl.trim()
    if (!trimmedUrl) return
    setVideoUrl(trimmedUrl)
  }

  const handleVideoSelect = (id: string) => {
    if (!id) return
    setVideoUrl(`https://www.youtube.com/watch?v=${id}`)
  }

  return (
    <main className="min-h-screen p-4 bg-background text-foreground">
      {/* Video input section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLoadVideo()}
                placeholder="Enter YouTube URL or Video ID"
                className="form-input"
              />
            </div>
            <button
              onClick={handleLoadVideo}
              className="btn-primary w-full md:w-auto"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load Video'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto grid gap-6">
        {/* Main video section */}
        <section className="grid grid-cols-1 gap-6">
          <div className="w-full">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg relative">
              {(videoId || playlistId) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${
                    videoId || ''
                  }${playlistId ? `?list=${playlistId}` : '?rel=0&modestbranding=1'}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-secondary">
                  Enter a YouTube URL or video ID above to start watching
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                </div>
              )}
            </div>
            {mainVideo && (
              <div className="mt-4 card">
                <h2 className="text-xl font-bold mb-2">{mainVideo.title}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-secondary mb-2">
                  {mainVideo.channel && (
                    <>
                      <span className="font-medium">{mainVideo.channel}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>{mainVideo.views}</span>
                </div>
              </div>
            )}
          </div>

          {/* Recommended videos */}
          {recommendedVideos.length > 0 && (
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4">Recommended Videos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    {...video}
                    onSelect={handleVideoSelect}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
