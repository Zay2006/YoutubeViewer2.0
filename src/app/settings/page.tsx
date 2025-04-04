'use client'

import { useState, useEffect } from 'react'
import type { ThemeOption } from '@/types/user'

interface UserSettings {
  name: string
  email: string
  theme: ThemeOption
  autoplay: boolean
  notifications: boolean
}

const THEMES: { value: ThemeOption; label: string; description: string }[] = [
  { value: 'light', label: 'Light', description: 'Clean and bright interface' },
  { value: 'dark', label: 'Dark', description: 'Easy on the eyes at night' },
  { value: 'blue', label: 'Ocean Blue', description: 'Calm and focused' },
  { value: 'purple', label: 'Royal Purple', description: 'Rich and elegant' },
  { value: 'green', label: 'Forest Green', description: 'Natural and soothing' },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    theme: 'light',
    autoplay: false,
    notifications: true,
  })

  const [isEditing, setIsEditing] = useState(true)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const savedSettings = localStorage.getItem('user_settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
      setIsEditing(false)
    }
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (settings.name.length < 4) {
      newErrors.name = 'Name must be at least 4 characters long'
    }

    if (!settings.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    localStorage.setItem('user_settings', JSON.stringify(settings))
    setIsEditing(false)

    // Apply theme
    document.documentElement.className = settings.theme
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-4">
          <a
            href="/"
            className="inline-flex items-center text-secondary hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </a>
        </div>
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Settings
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Information */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">User Information</h2>
              <div>
                <label htmlFor="name" className="form-label">
                  Display Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Enter your name (min. 4 characters)"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  disabled={!isEditing}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </section>

            {/* Appearance */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Appearance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {THEMES.map((theme) => (
                  <label
                    key={theme.value}
                    className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      settings.theme === theme.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={theme.value}
                      checked={settings.theme === theme.value}
                      onChange={(e) => setSettings({ ...settings, theme: e.target.value as ThemeOption })}
                      disabled={!isEditing}
                      className="sr-only"
                    />
                    <div>
                      <div className="font-medium">{theme.label}</div>
                      <div className="text-sm opacity-70">{theme.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Preferences */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Preferences</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.autoplay}
                    onChange={(e) => setSettings({ ...settings, autoplay: e.target.checked })}
                    disabled={!isEditing}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Autoplay next video</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                    disabled={!isEditing}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Enable notifications</span>
                </label>
              </div>
            </section>

            {isEditing && (
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setErrors({})
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Settings
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
