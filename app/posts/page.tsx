import { Suspense } from 'react'
import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import Loading from '@/components/Loading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Posts - Costa Rica Surf Blog',
  description: 'Browse all surf posts, beach guides, gear reviews, and surf reports from Costa Rica.',
}

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Posts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover everything about surfing in Costa Rica - from beginner guides to gear reviews and daily surf reports.
          </p>
        </div>

        {/* Category Filter */}
        <section className="mb-8">
          <CategoryFilter categories={categories} />
        </section>

        {/* Posts Grid */}
        <Suspense fallback={<Loading />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                showAuthor={true}
                showCategory={true}
              />
            ))}
          </div>
        </Suspense>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}