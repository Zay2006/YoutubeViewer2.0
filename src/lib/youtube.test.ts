import assert from 'node:assert/strict'
import test from 'node:test'
import { buildEmbedUrl, extractYouTubeParams } from './youtube.ts'

test('accepts a bare video id', () => {
  assert.deepEqual(extractYouTubeParams('  dQw4w9WgXcQ  '), { videoId: 'dQw4w9WgXcQ' })
})

test('parses watch, short, embed, live, and youtu.be urls', () => {
  assert.deepEqual(extractYouTubeParams('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), {
    videoId: 'dQw4w9WgXcQ',
  })
  assert.deepEqual(extractYouTubeParams('https://youtu.be/dQw4w9WgXcQ'), {
    videoId: 'dQw4w9WgXcQ',
  })
  assert.deepEqual(extractYouTubeParams('https://m.youtube.com/shorts/dQw4w9WgXcQ'), {
    videoId: 'dQw4w9WgXcQ',
  })
  assert.deepEqual(extractYouTubeParams('https://www.youtube.com/embed/dQw4w9WgXcQ'), {
    videoId: 'dQw4w9WgXcQ',
  })
  assert.deepEqual(extractYouTubeParams('https://www.youtube.com/live/dQw4w9WgXcQ'), {
    videoId: 'dQw4w9WgXcQ',
  })
  assert.deepEqual(extractYouTubeParams('music.youtube.com/watch?v=dQw4w9WgXcQ'), {
    videoId: 'dQw4w9WgXcQ',
  })
})

test('keeps a playlist and a start time', () => {
  assert.deepEqual(
    extractYouTubeParams('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLtestplaylist1&t=90'),
    { videoId: 'dQw4w9WgXcQ', playlistId: 'PLtestplaylist1', start: 90 }
  )
  assert.deepEqual(
    extractYouTubeParams('https://www.youtube.com/playlist?list=PLtestplaylist1'),
    { playlistId: 'PLtestplaylist1' }
  )
  assert.deepEqual(extractYouTubeParams('https://youtu.be/dQw4w9WgXcQ?t=1m30s'), {
    videoId: 'dQw4w9WgXcQ',
    start: 90,
  })
})

test('rejects values that are not YouTube targets', () => {
  assert.equal(extractYouTubeParams(''), null)
  assert.equal(extractYouTubeParams('not a url'), null)
  assert.equal(extractYouTubeParams('https://example.com/watch?v=dQw4w9WgXcQ'), null)
  assert.equal(extractYouTubeParams('https://www.youtube.com/watch?v=too-short'), null)
})

test('builds a playlist embed without an empty video id', () => {
  assert.equal(
    buildEmbedUrl({ playlistId: 'PLtestplaylist1' }),
    'https://www.youtube.com/embed/videoseries?list=PLtestplaylist1&rel=0&modestbranding=1'
  )
  assert.equal(
    buildEmbedUrl({ videoId: 'dQw4w9WgXcQ', autoplay: true, start: 30 }),
    'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&autoplay=1&start=30'
  )
})
