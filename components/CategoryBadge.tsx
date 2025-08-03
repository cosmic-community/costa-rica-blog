import Link from 'next/link'
import type { CategoryBadgeProps } from '@/types'

export default function CategoryBadge({ 
  category, 
  size = 'md', 
  className = '' 
}: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const bgColor = category.metadata?.color || '#6B7280'
  
  // Calculate contrasting text color
  const getTextColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return brightness > 128 ? '#000000' : '#FFFFFF'
  }

  const textColor = getTextColor(bgColor)

  return (
    <Link href={`/categories/${category.slug}`}>
      <span
        className={`inline-block font-medium rounded-full hover:opacity-80 transition-opacity cursor-pointer ${sizeClasses[size]} ${className}`}
        style={{
          backgroundColor: bgColor,
          color: textColor
        }}
      >
        {category.title}
      </span>
    </Link>
  )
}