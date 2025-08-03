// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/cosmic'
import PostContent from '@/components/PostContent'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import SurfConditionBadge from '@/components/SurfConditionBadge'
import { getPostExcerpt } from '@/types'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const excerpt = getPostExcerpt(post, 160)
  const imageUrl = post.metadata?.featured_image?.imgix_url

  return {
    title: `${post.title} - Costa Rica Surf Blog`,
    description: excerpt,
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      ...(imageUrl && {
        images: [
          {
            url: `${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.metadata?.category && (
              <CategoryBadge category={post.metadata.category} />
            )}
            {post.metadata?.surf_conditions && (
              <SurfConditionBadge condition={post.metadata.surf_conditions} />
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            {post.title}
          </h1>

          {/* Surf metadata */}
          {post.metadata?.wave_height && (
            <div className="bg-ocean-50 border border-ocean-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4 text-sm">
                <span className="font-semibold text-ocean-800">
                  🌊 Wave Height: {post.metadata.wave_height}
                </span>
                {post.metadata?.surf_conditions && (
                  <span className="font-semibold text-ocean-800">
                    ⭐ Conditions: {post.metadata.surf_conditions.value}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Featured Image */}
          {post.metadata?.featured_image && (
            <div className="mb-8">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Author */}
          {post.metadata?.author && (
            <div className="mb-8">
              <AuthorCard author={post.metadata.author} />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <PostContent post={post} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-500">¡Pura Vida! 🤙</p>
          </div>
        </footer>
      </div>
    </article>
  )
}