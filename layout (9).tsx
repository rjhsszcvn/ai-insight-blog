import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Insight — Daily AI & Tech Intelligence',
  description: 'Curated AI and tech news with analysis. What happened, why it matters, what comes next.',
  keywords: 'AI news, artificial intelligence, tech news, AI tools, startup funding',
  openGraph: {
    title: 'AI Insight — Daily AI & Tech Intelligence',
    description: 'Curated AI and tech news with real analysis.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
