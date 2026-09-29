'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            FocusTube
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/profile"
              className={`p-2 rounded-lg hover:bg-muted transition-colors ${
                pathname === '/profile' ? 'text-primary' : ''
              }`}
              aria-current={pathname === '/profile' ? 'page' : undefined}
            >
              <UserIcon className="w-6 h-6" />
              <span className="sr-only">Profile</span>
            </Link>
            <Link
              href="/settings"
              className={`p-2 rounded-lg hover:bg-muted transition-colors ${
                pathname === '/settings' ? 'text-primary' : ''
              }`}
              aria-current={pathname === '/settings' ? 'page' : undefined}
            >
              <Cog6ToothIcon className="w-6 h-6" />
              <span className="sr-only">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
