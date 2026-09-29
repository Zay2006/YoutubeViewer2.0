'use client'

import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { usePreferences } from '@/context/PreferencesContext'
import { THEME_OPTIONS, type ThemeOption } from '@/lib/preferences'

function labelFor(theme: ThemeOption) {
  return theme.charAt(0).toUpperCase() + theme.slice(1)
}

function ThemeIcon({ theme }: { theme: ThemeOption }) {
  if (theme === 'dark') return <MoonIcon className="w-6 h-6" />
  const color = {
    light: '',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    green: 'text-green-500',
  }[theme]
  return <SunIcon className={`w-6 h-6 ${color}`} />
}

export default function ThemeToggle() {
  const { preferences, updatePreferences } = usePreferences()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const theme = preferences.theme
  const themeLabel = labelFor(theme)

  const toggleTheme = () => {
    const currentIndex = THEME_OPTIONS.indexOf(theme)
    const nextTheme = THEME_OPTIONS[(currentIndex + 1) % THEME_OPTIONS.length]
    updatePreferences({ theme: nextTheme })
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={mounted ? `Toggle theme. Current theme: ${themeLabel}` : 'Toggle theme'}
      title={mounted ? `Current theme: ${themeLabel}` : 'Toggle theme'}
    >
      {mounted ? <ThemeIcon theme={theme} /> : <span className="block w-6 h-6" />}
      <span className="sr-only">
        {mounted ? `Current theme: ${themeLabel}` : 'Current theme'}
      </span>
    </button>
  )
}
