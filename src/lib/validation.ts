const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateIdentity(name: string, email: string) {
  const errors: Record<string, string> = {}
  const trimmedName = name.trim()
  const trimmedEmail = email.trim()

  if (trimmedName.length < 4) {
    errors.name = 'Name must be at least 4 characters long'
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address'
  }

  return { errors, name: trimmedName, email: trimmedEmail }
}
