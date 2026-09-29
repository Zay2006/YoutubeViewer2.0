import { useEffect, useState } from 'react'
import {
  findCatalogVideo,
  getRecommendations,
  isAllowedThumbnail,
  youtubeThumbnail,
  type VideoData,
} from '@/lib/catalog'
import type { YouTubeParams } from '@/lib/youtube'

interface OEmbedResponse {
  title?: string
  channel?: string
  thumbnail?: string
}

export function useYoutubeData(params: YouTubeParams | null) {
  const videoId = params?.videoId ?? ''
  const playlistId = params?.playlistId ?? ''
  const [mainVideo, setMainVideo] = useState<VideoData | null>(null)
  const [recommendedVideos, setRecommendedVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!videoId && !playlistId) {
      setMainVideo(null)
      setRecommendedVideos([])
      setLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()
    let cancelled = false
    let timedOut = false
    const timeout = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, 8000)
    const catalogVideo = videoId ? findCatalogVideo(videoId) : undefined
    const fallback: VideoData = {
      id: videoId || playlistId,
      title: catalogVideo?.title ?? (videoId ? 'YouTube video' : 'YouTube playlist'),
      thumbnail: videoId ? youtubeThumbnail(videoId) : '',
      views: catalogVideo?.views,
      duration: catalogVideo?.duration,
      channel: catalogVideo?.channel,
      description: catalogVideo?.description,
    }

    setLoading(true)
    setError(null)
    setMainVideo(fallback)
    setRecommendedVideos(getRecommendations(videoId || playlistId))

    async function loadDetails() {
      try {
        const query = new URLSearchParams()
        if (videoId) query.set('videoId', videoId)
        if (playlistId) query.set('playlistId', playlistId)
        const response = await fetch(`/api/oembed?${query.toString()}`, {
          signal: controller.signal,
        })
        if (cancelled) return

        if (!response.ok) {
          setError('Video details could not be loaded. Playback may still work.')
          return
        }

        const data = (await response.json()) as OEmbedResponse
        if (cancelled) return
        setMainVideo({
          ...fallback,
          title: data.title || fallback.title,
          channel: data.channel || fallback.channel,
          thumbnail: data.thumbnail && isAllowedThumbnail(data.thumbnail)
            ? data.thumbnail
            : fallback.thumbnail,
        })
      } catch (loadError) {
        if (cancelled) return
        const aborted = loadError instanceof DOMException && loadError.name === 'AbortError'
        if (aborted && !timedOut) return
        setError('Video details could not be loaded. Playback may still work.')
      } finally {
        window.clearTimeout(timeout)
        if (!cancelled) setLoading(false)
      }
    }

    void loadDetails()

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [videoId, playlistId])

  return { mainVideo, recommendedVideos, loading, error }
}
