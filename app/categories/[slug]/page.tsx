// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Costa Rica Surf Blog`,
    description: category.metadata?.description || `Browse all ${category.title.toLowerCase()} posts`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <CategoryBadge category={category} size="lg" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h1>
          {category.metadata?.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
          <div className="mt-6">
            <span className="text-sm text-gray-500">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                showAuthor={true}
                showCategory={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}