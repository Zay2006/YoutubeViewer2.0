export const PREFERENCES_KEY = 'focustube_preferences'

export const THEME_OPTIONS = ['light', 'dark', 'blue', 'purple', 'green'] as const

export type ThemeOption = (typeof THEME_OPTIONS)[number]

export interface Preferences {
  name: string
  email: string
  theme: ThemeOption
  autoplay: boolean
}

export const DEFAULT_PREFERENCES: Preferences = {
  name: '',
  email: '',
  theme: 'light',
  autoplay: false,
}

const LEGACY_BLOB_KEYS = ['user_settings', 'user_profile', 'focustube_user_preferences'] as const
const LEGACY_THEME_KEY = 'theme'

interface KeyValueStore {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export function isThemeOption(value: unknown): value is ThemeOption {
  return typeof value === 'string' && THEME_OPTIONS.includes(value as ThemeOption)
}

export function applyTheme(theme: ThemeOption) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  for (const option of THEME_OPTIONS) {
    root.classList.remove(option)
  }
  if (theme !== 'light') {
    root.classList.add(theme)
  }
}

function sanitizePreferences(value: unknown): Preferences {
  if (!value || typeof value !== 'object') return { ...DEFAULT_PREFERENCES }
  const record = value as Record<string, unknown>
  return {
    name: typeof record.name === 'string' ? record.name : '',
    email: typeof record.email === 'string' ? record.email : '',
    theme: isThemeOption(record.theme) ? record.theme : 'light',
    autoplay: record.autoplay === true,
  }
}

function readLegacyPreferences(storage: KeyValueStore): Preferences | null {
  let found = false
  let name = ''
  let email = ''
  let theme: ThemeOption | null = null
  let autoplay = false

  for (const key of LEGACY_BLOB_KEYS) {
    const raw = storage.getItem(key)
    if (!raw) continue
    try {
      const parsed = JSON.parse(raw) as unknown
      if (!parsed || typeof parsed !== 'object') continue
      const record = parsed as Record<string, unknown>
      found = true
      if (!name && typeof record.name === 'string') name = record.name
      if (!email && typeof record.email === 'string') email = record.email
      if (!theme && isThemeOption(record.theme)) theme = record.theme
      if (record.autoplay === true) autoplay = true
    } catch {
      // Ignore unreadable legacy values and keep looking.
    }
  }

  const legacyTheme = storage.getItem(LEGACY_THEME_KEY)
  if (isThemeOption(legacyTheme)) {
    theme = legacyTheme
    found = true
  }

  if (!found) return null
  return {
    name,
    email,
    theme: theme ?? 'light',
    autoplay,
  }
}

function persistPreferences(storage: KeyValueStore, preferences: Preferences) {
  storage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
  storage.removeItem(LEGACY_THEME_KEY)
  for (const key of LEGACY_BLOB_KEYS) {
    storage.removeItem(key)
  }
}

export function readPreferences(storage: KeyValueStore, prefersDark = false): Preferences {
  const stored = storage.getItem(PREFERENCES_KEY)
  if (stored) {
    try {
      const preferences = sanitizePreferences(JSON.parse(stored))
      persistPreferences(storage, preferences)
      return preferences
    } catch {
      // A corrupt value should not block the legacy fallback below.
    }
  }

  const migrated = readLegacyPreferences(storage)
  const preferences = migrated ?? {
    ...DEFAULT_PREFERENCES,
    theme: prefersDark ? 'dark' : 'light',
  }
  persistPreferences(storage, preferences)
  return preferences
}

export function loadPreferences(): Preferences {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return readPreferences(localStorage, prefersDark)
}

export function savePreferences(preferences: Preferences) {
  persistPreferences(localStorage, preferences)
}

export const THEME_INIT_SCRIPT = `(function () {
  var themes = ${JSON.stringify([...THEME_OPTIONS])};
  var storageKey = ${JSON.stringify(PREFERENCES_KEY)};
  var legacyBlobs = ${JSON.stringify([...LEGACY_BLOB_KEYS])};
  var theme = null;
  var hasStored = false;
  function accept(value) {
    return typeof value === 'string' && themes.indexOf(value) !== -1;
  }
  try {
    var raw = localStorage.getItem(storageKey);
    if (raw) {
      hasStored = true;
      var parsed = JSON.parse(raw);
      if (parsed && accept(parsed.theme)) theme = parsed.theme;
    }
    if (!hasStored) {
      var legacyTheme = localStorage.getItem(${JSON.stringify(LEGACY_THEME_KEY)});
      if (accept(legacyTheme)) theme = legacyTheme;
      if (!theme) {
        for (var i = 0; i < legacyBlobs.length; i++) {
          var blob = localStorage.getItem(legacyBlobs[i]);
          if (!blob) continue;
          var data = JSON.parse(blob);
          if (data && accept(data.theme)) {
            theme = data.theme;
            break;
          }
        }
      }
    }
  } catch (error) {}
  if (!theme && !hasStored && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  if (!theme) theme = 'light';
  var root = document.documentElement;
  for (var j = 0; j < themes.length; j++) root.classList.remove(themes[j]);
  if (theme !== 'light') root.classList.add(theme);
})();`
