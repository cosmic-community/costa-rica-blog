'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Category } from '@/types'

interface NavigationProps {
  categories: Category[]
}

export default function Navigation({ categories }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex items-center space-x-8">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link 
          href="/" 
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link 
          href="/posts" 
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Posts
        </Link>
        
        {/* Categories Dropdown */}
        <div className="relative group">
          <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1">
            <span>Categories</span>
            <svg 
              className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <Link 
          href="/about" 
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          About
        </Link>
        
        <Link 
          href="/contact" 
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Contact
        </Link>
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-700 hover:text-blue-600 transition-colors duration-200"
        aria-label="Toggle navigation"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-40">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/posts" 
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Posts
            </Link>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm font-semibold text-gray-500 mb-2">Categories</p>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="block pl-4 py-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {category.title}
                </Link>
              ))}
            </div>
            
            <Link 
              href="/about" 
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}