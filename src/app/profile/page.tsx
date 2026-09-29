'use client'

import { FormEvent } from 'react'
import IdentityFields from '@/components/IdentityFields'
import ThemePicker from '@/components/ThemePicker'
import { usePreferenceForm } from '@/hooks/usePreferenceForm'
import { validateIdentity } from '@/lib/validation'

export default function ProfilePage() {
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

    commitDraft({ name: result.name, email: result.email })
  }

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            {!isEditing && (
              <button type="button" onClick={beginEditing} className="btn-primary">
                Edit profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <IdentityFields
              name={shown.name}
              email={shown.email}
              errors={errors}
              disabled={!isEditing}
              onNameChange={(name) => updateDraft({ name })}
              onEmailChange={(email) => updateDraft({ email })}
            />

            <ThemePicker
              value={preferences.theme}
              onChange={changeTheme}
              disabled={!isEditing}
            />

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
                  Save profile
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  )
}
