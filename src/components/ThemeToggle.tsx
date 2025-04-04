'use client'

import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import type { ThemeOption } from '@/types/user'

const THEME_ICONS = {
  light: <SunIcon className="w-6 h-6" />,
  dark: <MoonIcon className="w-6 h-6" />,
  blue: <SunIcon className="w-6 h-6 text-blue-500" />,
  purple: <SunIcon className="w-6 h-6 text-purple-500" />,
  green: <SunIcon className="w-6 h-6 text-green-500" />
} as const

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeOption>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeOption | null
    if (savedTheme && Object.keys(THEME_ICONS).includes(savedTheme)) {
      setTheme(savedTheme)
      document.documentElement.className = savedTheme
    }
  }, [])

  const toggleTheme = () => {
    // Cycle through themes: light -> dark -> blue -> purple -> green -> light
    const themeOrder: ThemeOption[] = ['light', 'dark', 'blue', 'purple', 'green']
    const currentIndex = themeOrder.indexOf(theme)
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length]
    
    setTheme(nextTheme)
    document.documentElement.className = nextTheme
    localStorage.setItem('theme', nextTheme)

    // Also update user settings if they exist
    const settings = localStorage.getItem('user_settings')
    if (settings) {
      const parsed = JSON.parse(settings)
      parsed.theme = nextTheme
      localStorage.setItem('user_settings', JSON.stringify(parsed))
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
      title={`Current theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
    >
      {THEME_ICONS[theme]}
      <span className="sr-only">
        Current theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </span>
    </button>
  )
}
