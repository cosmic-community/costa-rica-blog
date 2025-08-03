import { Post } from '@/types'
import { marked } from 'marked'

interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  // Convert markdown content to HTML
  const contentHtml = post.metadata.content ? marked(post.metadata.content) : ''

  return (
    <article className="max-w-4xl mx-auto">
      {/* Post Content - Featured image removed to prevent duplication */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      
      {/* Author Bio */}
      {post.metadata.author?.metadata?.bio && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-3">About the Author</h3>
          <div className="flex items-start gap-4">
            {post.metadata.author.metadata?.profile_photo?.imgix_url && (
              <img
                src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div>
              <h4 className="font-medium text-lg mb-2">
                {post.metadata.author.metadata?.name || post.metadata.author.title}
              </h4>
              <p className="text-gray-600 mb-2">{post.metadata.author.metadata.bio}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {post.metadata.author.metadata?.years_surfing && (
                  <span>🏄‍♂️ {post.metadata.author.metadata.years_surfing} years surfing</span>
                )}
                {post.metadata.author.metadata?.instagram && (
                  <a
                    href={`https://instagram.com/${post.metadata.author.metadata.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    @{post.metadata.author.metadata.instagram}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}