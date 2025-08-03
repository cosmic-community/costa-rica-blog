import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group"
        >
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-ocean-300 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
              ></div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-ocean-600 transition-colors">
                  {category.title}
                </h3>
                {category.metadata?.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {category.metadata.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}