import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { PreferencesProvider } from '@/context/PreferencesContext'
import { THEME_INIT_SCRIPT } from '@/lib/preferences'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FocusTube',
  description: 'A distraction-free YouTube viewer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before paint. A deferred script would flash the default theme. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={inter.className}>
        <PreferencesProvider>
          <Navigation />
          {children}
        </PreferencesProvider>
      </body>
    </html>
  )
}
