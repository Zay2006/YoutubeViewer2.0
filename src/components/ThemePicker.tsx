import { THEME_OPTIONS, type ThemeOption } from '@/lib/preferences'

const THEME_DETAILS: Record<ThemeOption, { label: string; description: string }> = {
  light: { label: 'Light', description: 'Clean and bright interface' },
  dark: { label: 'Dark', description: 'Easy on the eyes at night' },
  blue: { label: 'Ocean Blue', description: 'Calm and focused' },
  purple: { label: 'Royal Purple', description: 'Rich and elegant' },
  green: { label: 'Forest Green', description: 'Natural and soothing' },
}

interface ThemePickerProps {
  value: ThemeOption
  onChange: (theme: ThemeOption) => void
  disabled?: boolean
}

export default function ThemePicker({ value, onChange, disabled = false }: ThemePickerProps) {
  return (
    <fieldset disabled={disabled} className="space-y-2">
      <legend className="form-label">Theme preference</legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {THEME_OPTIONS.map((theme) => {
          const details = THEME_DETAILS[theme]
          const selected = value === theme
          return (
            <label
              key={theme}
              className={`relative flex items-center p-4 rounded-lg border transition-colors ${
                disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
              } ${
                selected
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={selected}
                onChange={() => onChange(theme)}
                className="sr-only"
              />
              <span>
                <span className="block font-medium">{details.label}</span>
                <span className="block text-sm text-secondary">{details.description}</span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
