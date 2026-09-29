import assert from 'node:assert/strict'
import test from 'node:test'
import { getRecommendations, VIDEO_CATALOG } from './catalog.ts'

test('recommends five stable videos and leaves out the current one', () => {
  const currentId = VIDEO_CATALOG[0].id
  const first = getRecommendations(currentId)
  const second = getRecommendations(currentId)

  assert.equal(first.length, 5)
  assert.deepEqual(first, second)
  assert.equal(first.some((video) => video.id === currentId), false)
  assert.equal(first.every((video) => video.views?.includes('views')), false)
})
