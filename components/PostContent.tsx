import { Post } from '@/types'
import { marked } from 'marked'

interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  // Convert markdown content to HTML
  const contentHtml = post.metadata.content ? marked(post.metadata.content) : ''
  
  const featuredImage = post.metadata.featured_image?.imgix_url
  const categoryColor = post.metadata.category?.metadata?.color || '#0080ff'

  return (
    <article className="max-w-4xl mx-auto">
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8">
          <img
            src={`${featuredImage}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.metadata.title || post.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      )}
      
      {/* Post Header */}
      <header className="mb-8">
        {/* Category */}
        {post.metadata.category && (
          <div 
            className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
            style={{ backgroundColor: categoryColor }}
          >
            {post.metadata.category.metadata?.name || post.metadata.category.title}
          </div>
        )}
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.metadata.title || post.title}
        </h1>
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
          {/* Author */}
          {post.metadata.author && (
            <div className="flex items-center gap-3">
              {post.metadata.author.metadata?.profile_photo?.imgix_url && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-medium text-gray-900">
                  {post.metadata.author.metadata?.name || post.metadata.author.title}
                </div>
                {post.metadata.author.metadata?.instagram && (
                  <div className="text-sm">
                    <a
                      href={`https://instagram.com/${post.metadata.author.metadata.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      @{post.metadata.author.metadata.instagram}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Wave Height */}
          {post.metadata.wave_height && (
            <div className="flex items-center gap-2">
              <span>🌊</span>
              <span>{post.metadata.wave_height}</span>
            </div>
          )}
          
          {/* Surf Conditions */}
          {post.metadata.surf_conditions && (
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span>
                {typeof post.metadata.surf_conditions === 'string' 
                  ? post.metadata.surf_conditions 
                  : post.metadata.surf_conditions.value}
              </span>
            </div>
          )}
        </div>
      </header>
      
      {/* Post Content */}
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