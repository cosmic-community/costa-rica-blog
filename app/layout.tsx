import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Costa Rica Surf Blog - Pura Vida Waves',
  description: 'Your ultimate guide to surfing in Costa Rica. Discover the best beaches, gear reviews, beginner tips, and surf reports from local experts.',
  keywords: 'costa rica surf, surfing, waves, beach guides, surf reports, pura vida',
  authors: [{ name: 'Costa Rica Surf Blog' }],
  openGraph: {
    title: 'Costa Rica Surf Blog - Pura Vida Waves',
    description: 'Your ultimate guide to surfing in Costa Rica. Discover the best beaches, gear reviews, beginner tips, and surf reports from local experts.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}