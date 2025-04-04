'use client'

import { useState, useEffect } from 'react'
import type { ThemeOption, UserProfile } from '@/types/user'

const THEMES: { value: ThemeOption; label: string; description: string }[] = [
  { value: 'light', label: 'Light', description: 'Clean and bright interface' },
  { value: 'dark', label: 'Dark', description: 'Easy on the eyes at night' },
  { value: 'blue', label: 'Ocean Blue', description: 'Calm and focused' },
  { value: 'purple', label: 'Royal Purple', description: 'Rich and elegant' },
  { value: 'green', label: 'Forest Green', description: 'Natural and soothing' },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    password: '',
    theme: 'light',
    createdAt: '',
    lastLogin: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isEditing, setIsEditing] = useState(true)

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
      setIsEditing(false)
    }
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (profile.name.length < 4) {
      newErrors.name = 'Name must be at least 4 characters long'
    }

    if (!profile.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (profile.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const now = new Date().toISOString()
    const updatedProfile = {
      ...profile,
      lastLogin: now,
      createdAt: profile.createdAt || now,
    }

    localStorage.setItem('user_profile', JSON.stringify(updatedProfile))
    setProfile(updatedProfile)
    setIsEditing(false)

    // Apply theme
    document.documentElement.className = updatedProfile.theme
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">User Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
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
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter your password (min. 6 characters)"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="form-label">Theme Preference</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {THEMES.map((theme) => (
                  <label
                    key={theme.value}
                    className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      profile.theme === theme.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={theme.value}
                      checked={profile.theme === theme.value}
                      onChange={(e) => setProfile({ ...profile, theme: e.target.value as ThemeOption })}
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
            </div>

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
                  Save Profile
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
