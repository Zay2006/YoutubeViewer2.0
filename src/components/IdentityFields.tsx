interface IdentityFieldsProps {
  name: string
  email: string
  errors: Record<string, string>
  disabled?: boolean
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
}

export default function IdentityFields({
  name,
  email,
  errors,
  disabled = false,
  onNameChange,
  onEmailChange,
}: IdentityFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          disabled={disabled}
          autoComplete="name"
          placeholder="Enter your name (min. 4 characters)"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          disabled={disabled}
          autoComplete="email"
          placeholder="your.email@example.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>
    </>
  )
}
