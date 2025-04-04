'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
              FocusTube
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/settings" 
              className={`p-2 rounded-lg hover:bg-muted transition-colors ${
                pathname === '/settings' ? 'text-primary' : ''
              }`}
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
