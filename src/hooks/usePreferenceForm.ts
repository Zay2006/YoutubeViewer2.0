'use client'

import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '@/context/PreferencesContext'
import { DEFAULT_PREFERENCES, type Preferences, type ThemeOption } from '@/lib/preferences'

export function usePreferenceForm() {
  const { preferences, ready, updatePreferences } = usePreferences()
  const [draft, setDraft] = useState<Preferences>(DEFAULT_PREFERENCES)
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const snapshot = useRef<Preferences>(DEFAULT_PREFERENCES)
  const initialized = useRef(false)

  useEffect(() => {
    if (!ready || initialized.current) return
    initialized.current = true
    snapshot.current = preferences
    setDraft(preferences)
    const hasIdentity = preferences.name.trim().length > 0 || preferences.email.trim().length > 0
    setIsEditing(!hasIdentity)
  }, [ready, preferences])

  const changeTheme = (theme: ThemeOption) => {
    setDraft((current) => ({ ...current, theme }))
    updatePreferences({ theme })
  }

  const updateDraft = (patch: Partial<Preferences>) => {
    setDraft((current) => ({ ...current, ...patch }))
  }

  const beginEditing = () => {
    snapshot.current = preferences
    setDraft(preferences)
    setErrors({})
    setIsEditing(true)
  }

  const cancelEditing = () => {
    const saved = snapshot.current
    updatePreferences(saved)
    setDraft(saved)
    setErrors({})
    setIsEditing(false)
  }

  const commitDraft = (patch: Partial<Preferences>) => {
    const next = { ...draft, ...patch }
    snapshot.current = next
    setDraft(next)
    updatePreferences(patch)
    setErrors({})
    setIsEditing(false)
  }

  return {
    preferences,
    ready,
    draft,
    isEditing,
    errors,
    setErrors,
    changeTheme,
    updateDraft,
    beginEditing,
    cancelEditing,
    commitDraft,
  }
}
