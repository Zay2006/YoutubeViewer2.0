import { useState, useEffect } from 'react'
import type { UserPreference } from '@/components/FeedbackForm'

const USER_PREFS_KEY = 'focustube_user_preferences'

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreference | null>(null)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  useEffect(() => {
    // Load preferences from localStorage
    const savedPrefs = localStorage.getItem(USER_PREFS_KEY)
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs))
    }
  }, [])

  const savePreferences = (prefs: UserPreference) => {
    setPreferences(prefs)
    localStorage.setItem(USER_PREFS_KEY, JSON.stringify(prefs))
    setShowFeedbackForm(false)

    // Apply theme
    document.documentElement.classList.toggle('dark', prefs.theme === 'dark')
  }

  const requestThemeChange = (newTheme: 'light' | 'dark') => {
    if (!preferences) {
      setShowFeedbackForm(true)
      return false
    }

    // User has already submitted preferences, just update theme
    savePreferences({ ...preferences, theme: newTheme })
    return true
  }

  return {
    preferences,
    showFeedbackForm,
    setShowFeedbackForm,
    savePreferences,
    requestThemeChange
  }
}
