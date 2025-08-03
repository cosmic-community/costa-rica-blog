import { Suspense } from 'react'
import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'
import Loading from '@/components/Loading'
import type { Post, Category } from '@/types'

export default async function HomePage() {
  // Fetch posts and categories in parallel
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  // Get featured post (first post)
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7) // Show 6 recent posts

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Hero Section */}
      {featuredPost && <Hero post={featuredPost} />}

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Categories</h2>
          <CategoryFilter categories={categories} />
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Posts</h2>
          <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  showAuthor={true}
                  showCategory={true}
                />
              ))}
            </div>
          </Suspense>
          
          {recentPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts available yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}