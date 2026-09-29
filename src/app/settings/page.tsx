'use client'

import { FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import IdentityFields from '@/components/IdentityFields'
import ThemePicker from '@/components/ThemePicker'
import { usePreferenceForm } from '@/hooks/usePreferenceForm'
import { validateIdentity } from '@/lib/validation'

export default function SettingsPage() {
  const {
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
  } = usePreferenceForm()

  if (!ready) {
    return <div className="min-h-screen" />
  }

  const shown = isEditing ? draft : preferences

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = validateIdentity(draft.name, draft.email)
    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors)
      return
    }

    commitDraft({
      name: result.name,
      email: result.email,
      autoplay: draft.autoplay,
    })
  }

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Settings</h1>
            {!isEditing && (
              <button type="button" onClick={beginEditing} className="btn-primary">
                Edit settings
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">User information</h2>
              <IdentityFields
                name={shown.name}
                email={shown.email}
                errors={errors}
                disabled={!isEditing}
                onNameChange={(name) => updateDraft({ name })}
                onEmailChange={(email) => updateDraft({ email })}
              />
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Appearance</h2>
              <ThemePicker
                value={preferences.theme}
                onChange={changeTheme}
                disabled={!isEditing}
              />
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Playback</h2>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={shown.autoplay}
                  onChange={(event) => updateDraft({ autoplay: event.target.checked })}
                  disabled={!isEditing}
                  className="mt-1 w-4 h-4 rounded border-muted text-primary focus:ring-primary"
                />
                <span>
                  <span className="block">Autoplay videos</span>
                  <span className="block text-sm text-secondary">
                    Applies the next time you load a video.
                  </span>
                </span>
              </label>
            </section>

            {isEditing && (
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-2 text-secondary hover:bg-muted rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save settings
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  )
}
