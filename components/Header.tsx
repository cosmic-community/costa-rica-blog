import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'

export default async function Header() {
  const categories = await getCategories()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏄‍♂️</span>
            <span className="text-xl font-bold text-gray-900">Costa Rica Surf</span>
          </Link>

          {/* Navigation */}
          <Navigation categories={categories} />
        </div>
      </div>
    </header>
  )
}