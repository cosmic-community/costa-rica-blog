import Link from 'next/link'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import SurfConditionBadge from '@/components/SurfConditionBadge'
import { getPostExcerpt } from '@/types'
import type { PostCardProps } from '@/types'

export default function PostCard({ 
  post, 
  showAuthor = true, 
  showCategory = true,
  className = '' 
}: PostCardProps) {
  const excerpt = getPostExcerpt(post, 120)

  return (
    <article className={`card hover:shadow-md transition-shadow ${className}`}>
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <div className="aspect-video overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              width={300}
              height={200}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {showCategory && post.metadata?.category && (
            <CategoryBadge category={post.metadata.category} size="sm" />
          )}
          {post.metadata?.surf_conditions && (
            <SurfConditionBadge condition={post.metadata.surf_conditions} size="sm" />
          )}
        </div>

        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-ocean-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Surf Info */}
        {post.metadata?.wave_height && (
          <div className="text-sm text-ocean-600 mb-4">
            🌊 Wave Height: {post.metadata.wave_height}
          </div>
        )}

        {/* Author */}
        {showAuthor && post.metadata?.author && (
          <div className="mt-auto">
            <AuthorCard author={post.metadata.author} />
          </div>
        )}

        {/* Read More */}
        <div className="mt-4">
          <Link 
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-ocean-600 hover:text-ocean-700 font-medium text-sm transition-colors"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}