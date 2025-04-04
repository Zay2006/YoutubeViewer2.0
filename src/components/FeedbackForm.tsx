'use client'

interface FeedbackFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: UserPreference) => void
}

export interface UserPreference {
  name: string
  email: string
  theme: 'light' | 'dark'
  preferredFeatures?: string[]
}

export default function FeedbackForm({ isOpen, onClose, onSubmit }: FeedbackFormProps) {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data: UserPreference = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      theme: formData.get('theme') as 'light' | 'dark',
      preferredFeatures: Array.from(formData.getAll('features') as string[])
    }

    onSubmit(data)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Help us improve FocusTube!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We'd love to hear your feedback about our theme feature. This helps us prioritize future improvements.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              minLength={2}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Theme
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  defaultChecked
                  className="mr-2"
                />
                Light Mode
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  className="mr-2"
                />
                Dark Mode
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Which features would you like to see?
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="features"
                  value="customThemes"
                  className="mr-2"
                />
                Custom Theme Colors
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="features"
                  value="autoTheme"
                  className="mr-2"
                />
                Automatic Theme Switching
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="features"
                  value="fontCustomization"
                  className="mr-2"
                />
                Font Customization
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
