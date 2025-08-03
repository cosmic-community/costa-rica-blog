'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Category } from '@/types'

interface NavigationProps {
  categories: Category[]
}

export default function Navigation({ categories }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-gray-700 hover:text-ocean-600 transition-colors">
          Home
        </Link>
        <Link href="/posts" className="text-gray-700 hover:text-ocean-600 transition-colors">
          All Posts
        </Link>
        
        {/* Categories Dropdown */}
        <div className="relative group">
          <button className="text-gray-700 hover:text-ocean-600 transition-colors flex items-center">
            Categories
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ocean-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <span className="flex items-center">
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: category.metadata?.color || '#gray' }}
                  ></span>
                  {category.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-700 hover:text-ocean-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-ocean-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/posts" 
              className="block text-gray-700 hover:text-ocean-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              All Posts
            </Link>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="block px-2 py-1 text-sm text-gray-700 hover:text-ocean-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <span 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: category.metadata?.color || '#gray' }}
                    ></span>
                    {category.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}