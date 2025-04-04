'use client'

import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useUserPreferences } from '@/hooks/useUserPreferences'
import FeedbackForm from './FeedbackForm'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const {
    preferences,
    showFeedbackForm,
    setShowFeedbackForm,
    savePreferences,
    requestThemeChange
  } = useUserPreferences()

  const isDark = preferences?.theme === 'dark'

  useEffect(() => {
    setMounted(true)
    // Handle system preference if no saved preference
    if (!preferences && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light'
    const success = requestThemeChange(newTheme)
    
    // If success is false, the feedback form will be shown
    // The theme will be applied after form submission
    if (success) {
      document.documentElement.classList.toggle('dark')
    }
  }

  if (!mounted) return null

  return (
    <>
      <button
        onClick={toggleTheme}
        className="relative inline-flex items-center justify-center w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        <span className="sr-only">Toggle theme</span>
        
        {/* Toggle switch */}
        <span
          className={`absolute left-1 w-5 h-5 rounded-full transform transition-transform duration-300 ${
            isDark ? 'translate-x-7 bg-primary' : 'translate-x-0 bg-white'
          }`}
        />
        
        {/* Icons */}
        <span className="absolute inset-0 flex items-center justify-between px-1.5">
          <SunIcon className={`w-3.5 h-3.5 text-yellow-500 transition-opacity duration-300 ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`} />
          <MoonIcon className={`w-3.5 h-3.5 text-blue-200 transition-opacity duration-300 ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`} />
        </span>
      </button>

      <FeedbackForm
        isOpen={showFeedbackForm}
        onClose={() => setShowFeedbackForm(false)}
        onSubmit={savePreferences}
      />
    </>
  )
}
