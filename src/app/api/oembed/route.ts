import { NextRequest, NextResponse } from 'next/server'
import { isPlaylistId, isVideoId } from '@/lib/youtube'

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get('videoId')?.trim() ?? ''
  const playlistId = request.nextUrl.searchParams.get('playlistId')?.trim() ?? ''

  if (videoId && !isVideoId(videoId)) {
    return NextResponse.json({ error: 'Invalid video id' }, { status: 400 })
  }
  if (playlistId && !isPlaylistId(playlistId)) {
    return NextResponse.json({ error: 'Invalid playlist id' }, { status: 400 })
  }
  if (!videoId && !playlistId) {
    return NextResponse.json({ error: 'Missing video or playlist id' }, { status: 400 })
  }

  // The target is built from validated ids so this route cannot fetch an arbitrary URL.
  const target = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : `https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(target)}&format=json`,
      { next: { revalidate: 60 * 60 * 24 } }
    )
    if (!response.ok) {
      return NextResponse.json({ error: 'Video details not found' }, { status: 404 })
    }

    const data = (await response.json()) as {
      title?: unknown
      author_name?: unknown
      thumbnail_url?: unknown
    }

    return NextResponse.json({
      title: typeof data.title === 'string' ? data.title : '',
      channel: typeof data.author_name === 'string' ? data.author_name : '',
      thumbnail: typeof data.thumbnail_url === 'string' ? data.thumbnail_url : '',
    })
  } catch {
    return NextResponse.json({ error: 'Could not load video details' }, { status: 502 })
  }
}
