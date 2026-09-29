export interface VideoData {
  id: string
  title: string
  thumbnail: string
  views?: string
  duration?: string
  channel?: string
  description?: string
}

const THUMBNAIL_HOSTS = new Set(['i.ytimg.com', 'img.youtube.com'])

export function youtubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export function isAllowedThumbnail(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' && THUMBNAIL_HOSTS.has(parsed.hostname)
  } catch {
    return false
  }
}

function hashString(value: string): number {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (Math.imul(hash, 31) + value.charCodeAt(index)) >>> 0
  }
  return hash
}

// Static catalog used for recommendations and for details oEmbed does not provide.
// View counts and durations are placeholders, not live YouTube data.
export const VIDEO_CATALOG: VideoData[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up (Official Video)',
    thumbnail: youtubeThumbnail('dQw4w9WgXcQ'),
    views: '1.6B',
    duration: '3:33',
    channel: 'Rick Astley',
    description: 'Official music video for Rick Astley’s 1987 song Never Gonna Give You Up.',
  },
  {
    id: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE (강남스타일) M/V',
    thumbnail: youtubeThumbnail('9bZkp7q19f0'),
    views: '5.3B',
    duration: '4:12',
    channel: 'officialpsy',
    description: 'Official music video for PSY’s Gangnam Style.',
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    thumbnail: youtubeThumbnail('kJQP7kiw5Fk'),
    views: '8.6B',
    duration: '4:41',
    channel: 'Luis Fonsi',
    description: 'Official music video for Despacito by Luis Fonsi and Daddy Yankee.',
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Ed Sheeran - Shape of You (Official Video)',
    thumbnail: youtubeThumbnail('JGwWNGJdvx8'),
    views: '6.4B',
    duration: '4:24',
    channel: 'Ed Sheeran',
    description: 'Official music video for Ed Sheeran’s Shape of You.',
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'Queen – Bohemian Rhapsody (Official Video Remastered)',
    thumbnail: youtubeThumbnail('fJ9rUzIMcZQ'),
    views: '2.1B',
    duration: '5:59',
    channel: 'Queen Official',
    description: 'Remastered official video for Queen’s Bohemian Rhapsody.',
  },
  {
    id: 'hTWKbfoikeg',
    title: 'Nirvana - Smells Like Teen Spirit (Official Music Video)',
    thumbnail: youtubeThumbnail('hTWKbfoikeg'),
    views: '2.0B',
    duration: '4:38',
    channel: 'Nirvana',
    description: 'Official music video for Nirvana’s Smells Like Teen Spirit.',
  },
  {
    id: 'OPf0YbXqDm0',
    title: 'Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars',
    thumbnail: youtubeThumbnail('OPf0YbXqDm0'),
    views: '5.4B',
    duration: '4:30',
    channel: 'Mark Ronson',
    description: 'Official music video for Uptown Funk by Mark Ronson featuring Bruno Mars.',
  },
  {
    id: 'YQHsXMglC9A',
    title: 'Adele - Hello (Official Music Video)',
    thumbnail: youtubeThumbnail('YQHsXMglC9A'),
    views: '3.5B',
    duration: '6:07',
    channel: 'Adele',
    description: 'Official music video for Adele’s Hello.',
  },
]

export function findCatalogVideo(videoId: string): VideoData | undefined {
  return VIDEO_CATALOG.find((video) => video.id === videoId)
}

export function getRecommendations(currentId?: string): VideoData[] {
  const pool = VIDEO_CATALOG.filter((video) => video.id !== currentId)
  if (pool.length === 0) return []
  const start = currentId ? hashString(currentId) % pool.length : 0
  const rotated = [...pool.slice(start), ...pool.slice(0, start)]
  return rotated.slice(0, 5)
}
