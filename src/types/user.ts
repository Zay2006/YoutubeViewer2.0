export type ThemeOption = 'light' | 'dark' | 'blue' | 'purple' | 'green'

export interface UserProfile {
  name: string
  email: string
  password: string
  theme: ThemeOption
  createdAt: string
  lastLogin: string
}
