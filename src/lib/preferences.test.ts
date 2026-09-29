import assert from 'node:assert/strict'
import test from 'node:test'
import { PREFERENCES_KEY, readPreferences } from './preferences.ts'

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem(key: string) {
      return values.has(key) ? values.get(key)! : null
    },
    setItem(key: string, value: string) {
      values.set(key, value)
    },
    removeItem(key: string) {
      values.delete(key)
    },
    values,
  }
}

test('uses saved preferences and drops the legacy password record', () => {
  const storage = createStorage({
    [PREFERENCES_KEY]: JSON.stringify({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      theme: 'purple',
      autoplay: true,
    }),
    user_profile: JSON.stringify({ password: 'secret-password', theme: 'dark' }),
  })

  const preferences = readPreferences(storage, false)

  assert.deepEqual(preferences, {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    theme: 'purple',
    autoplay: true,
  })
  assert.equal(storage.getItem('user_profile'), null)
})

test('migrates legacy settings without copying a password', () => {
  const storage = createStorage({
    theme: 'green',
    user_profile: JSON.stringify({
      name: 'Grace Hopper',
      email: 'grace@example.com',
      password: 'secret-password',
      theme: 'blue',
    }),
    user_settings: JSON.stringify({
      name: 'Grace',
      email: 'settings@example.com',
      theme: 'purple',
      autoplay: true,
    }),
  })

  const preferences = readPreferences(storage, true)

  assert.equal(preferences.name, 'Grace')
  assert.equal(preferences.email, 'settings@example.com')
  assert.equal(preferences.theme, 'green')
  assert.equal(preferences.autoplay, true)
  assert.equal(JSON.stringify(preferences).includes('secret-password'), false)
  assert.equal(storage.getItem('user_profile'), null)
  assert.equal(storage.getItem('theme'), null)
  assert.equal(storage.getItem(PREFERENCES_KEY)?.includes('green'), true)
})

test('follows the system theme when nothing is stored', () => {
  const storage = createStorage()
  assert.equal(readPreferences(storage, true).theme, 'dark')
  assert.equal(readPreferences(createStorage(), false).theme, 'light')
})

test('ignores corrupt saved preferences and falls back to legacy data', () => {
  const storage = createStorage({
    [PREFERENCES_KEY]: '{not json',
    user_settings: JSON.stringify({ name: 'Alan Turing', email: 'alan@example.com', theme: 'blue' }),
  })

  const preferences = readPreferences(storage, false)
  assert.equal(preferences.name, 'Alan Turing')
  assert.equal(preferences.theme, 'blue')
  assert.equal(preferences.autoplay, false)
})
