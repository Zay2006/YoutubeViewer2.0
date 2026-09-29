'use client'

import { FormEvent, useState } from 'react'
import VideoCard from '@/components/VideoCard'
import { usePreferences } from '@/context/PreferencesContext'
import { useYoutubeData } from '@/hooks/useYoutubeData'
import { buildEmbedUrl, extractYouTubeParams, type YouTubeParams } from '@/lib/youtube'

interface Playback {
  params: YouTubeParams
  autoplay: boolean
}

export default function Home() {
  const { preferences } = usePreferences()
  const [videoUrl, setVideoUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [playback, setPlayback] = useState<Playback | null>(null)
  const { mainVideo, recommendedVideos, loading, error } = useYoutubeData(playback?.params ?? null)

  const loadVideo = (rawValue: string) => {
    const trimmed = rawValue.trim()
    if (!trimmed) {
      setUrlError('Enter a YouTube URL or video ID.')
      return
    }

    const params = extractYouTubeParams(trimmed)
    if (!params) {
      setUrlError('That does not look like a YouTube URL or video ID.')
      return
    }

    setUrlError('')
    setVideoUrl(trimmed)
    setPlayback({ params, autoplay: preferences.autoplay })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loadVideo(videoUrl)
  }

  const handleVideoSelect = (id: string) => {
    loadVideo(`https://www.youtube.com/watch?v=${id}`)
  }

  const hasRecommendations = recommendedVideos.length > 0

  return (
    <main className="min-h-screen p-4 bg-background text-foreground">
      <div className="max-w-7xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="card p-4" noValidate>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 w-full">
              <label htmlFor="video-url" className="sr-only">
                YouTube URL or video ID
              </label>
              <input
                id="video-url"
                type="text"
                value={videoUrl}
                onChange={(event) => {
                  setVideoUrl(event.target.value)
                  if (urlError) setUrlError('')
                }}
                placeholder="Enter a YouTube URL or video ID"
                className="form-input"
                autoComplete="off"
                spellCheck={false}
                aria-invalid={urlError ? true : undefined}
                aria-describedby={urlError ? 'video-url-error' : undefined}
              />
              {urlError && (
                <p id="video-url-error" className="mt-2 text-sm text-red-600" role="alert">
                  {urlError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary w-full md:w-auto"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load video'}
            </button>
          </div>
        </form>
      </div>

      <div className={`max-w-7xl mx-auto grid gap-6 ${hasRecommendations ? 'lg:grid-cols-3' : ''}`}>
        <section className={hasRecommendations ? 'lg:col-span-2' : undefined}>
          {!mainVideo && <h1 className="sr-only">FocusTube</h1>}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
            {playback ? (
              <iframe
                key={`${playback.params.videoId ?? ''}-${playback.params.playlistId ?? ''}-${playback.params.start ?? 0}`}
                src={buildEmbedUrl({ ...playback.params, autoplay: playback.autoplay })}
                title={mainVideo?.title ?? 'YouTube video player'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-secondary">
                Enter a YouTube URL or video ID above to start watching
              </div>
            )}
          </div>

          {mainVideo && (
            <div className="mt-4 card p-6">
              <h1 className="text-xl font-bold mb-2">{mainVideo.title}</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-secondary mb-2">
                {mainVideo.channel && (
                  <>
                    <span className="font-medium">{mainVideo.channel}</span>
                    <span aria-hidden="true">•</span>
                  </>
                )}
                {mainVideo.views && <span>{mainVideo.views} views</span>}
              </div>
              {mainVideo.description && (
                <p className="text-sm text-secondary">{mainVideo.description}</p>
              )}
              {loading && (
                <p className="mt-3 text-sm text-secondary" role="status">Loading video details...</p>
              )}
              {error && (
                <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>
              )}
            </div>
          )}
        </section>

        {hasRecommendations && (
          <aside className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Recommended videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {recommendedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  {...video}
                  onSelect={handleVideoSelect}
                />
              ))}
            </div>
          </aside>
        )}
      </div>
    </main>
  )
}
