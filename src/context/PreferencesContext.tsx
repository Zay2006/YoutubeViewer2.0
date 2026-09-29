'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import {
  applyTheme,
  DEFAULT_PREFERENCES,
  loadPreferences,
  savePreferences,
  type Preferences,
} from '@/lib/preferences'

interface PreferencesContextValue {
  preferences: Preferences
  ready: boolean
  updatePreferences: (patch: Partial<Preferences>) => void
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES)
  const [ready, setReady] = useState(false)
  const preferencesRef = useRef(preferences)

  useEffect(() => {
    const loaded = loadPreferences()
    preferencesRef.current = loaded
    setPreferences(loaded)
    applyTheme(loaded.theme)
    setReady(true)
  }, [])

  const updatePreferences = (patch: Partial<Preferences>) => {
    const next = { ...preferencesRef.current, ...patch }
    preferencesRef.current = next
    setPreferences(next)
    savePreferences(next)
    applyTheme(next.theme)
  }

  return (
    <PreferencesContext.Provider value={{ preferences, ready, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider')
  }
  return context
}
