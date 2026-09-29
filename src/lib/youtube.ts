const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/
const PLAYLIST_ID_PATTERN = /^[a-zA-Z0-9_-]{2,80}$/

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'youtu.be',
  'youtube-nocookie.com',
  'music.youtube.com',
])

export interface YouTubeParams {
  videoId?: string
  playlistId?: string
  start?: number
}

export function isVideoId(value: string): boolean {
  return VIDEO_ID_PATTERN.test(value)
}

export function isPlaylistId(value: string): boolean {
  return PLAYLIST_ID_PATTERN.test(value)
}

function parseStart(value: string | null): number | undefined {
  if (!value) return undefined
  if (/^\d+$/.test(value)) {
    const seconds = Number(value)
    return seconds > 0 ? seconds : undefined
  }

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/)
  if (!match || (match[1] === undefined && match[2] === undefined && match[3] === undefined)) {
    return undefined
  }

  const seconds = Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0)
  return seconds > 0 ? seconds : undefined
}

export function extractYouTubeParams(input: string): YouTubeParams | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  if (isVideoId(trimmed)) return { videoId: trimmed }

  let url: URL
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`)
  } catch {
    return null
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, '').replace(/^m\./, '')
  if (!YOUTUBE_HOSTS.has(host)) return null

  const list = url.searchParams.get('list')?.trim() ?? ''
  const playlistId = isPlaylistId(list) ? list : undefined
  const parts = url.pathname.split('/').filter(Boolean)

  let videoId: string | undefined
  if (host === 'youtu.be') {
    videoId = parts[0]
  } else if (parts[0] === 'watch') {
    videoId = url.searchParams.get('v') ?? undefined
  } else if (
    parts[0] === 'embed' ||
    parts[0] === 'shorts' ||
    parts[0] === 'live' ||
    parts[0] === 'v'
  ) {
    videoId = parts[1]
  }

  if (videoId && !isVideoId(videoId)) videoId = undefined
  if (!videoId && !playlistId) return null

  const start = parseStart(url.searchParams.get('t') ?? url.searchParams.get('start'))
  return {
    ...(videoId ? { videoId } : {}),
    ...(playlistId ? { playlistId } : {}),
    ...(start ? { start } : {}),
  }
}

export function buildEmbedUrl(params: YouTubeParams & { autoplay?: boolean }): string {
  const id = params.videoId ?? 'videoseries'
  const search = new URLSearchParams()
  if (params.playlistId) search.set('list', params.playlistId)
  search.set('rel', '0')
  search.set('modestbranding', '1')
  if (params.autoplay) search.set('autoplay', '1')
  if (params.start) search.set('start', String(params.start))
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}?${search.toString()}`
}
