import { Post } from '@/types'

interface HeroProps {
  featuredPost?: Post
}

export default function Hero({ featuredPost }: HeroProps) {
  if (!featuredPost) {
    return (
      <section className="relative bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Costa Rica Surf Blog</h1>
          <p className="text-xl mb-8">Discover the best waves, beaches, and surf culture in Costa Rica</p>
          <div className="text-lg">¡Pura Vida! 🌊🤙</div>
        </div>
      </section>
    )
  }

  const featuredImage = featuredPost.metadata.featured_image?.imgix_url
  const categoryColor = featuredPost.metadata.category?.metadata?.color || '#0080ff'

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      {featuredImage && (
        <div className="absolute inset-0">
          <img
            src={`${featuredImage}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt={featuredPost.metadata.title || featuredPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <div className="max-w-4xl">
          {/* Category Badge */}
          {featuredPost.metadata.category && (
            <div 
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: categoryColor }}
            >
              {featuredPost.metadata.category.metadata?.name || featuredPost.metadata.category.title}
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {featuredPost.metadata.title || featuredPost.title}
          </h1>
          
          {/* Author and Wave Info */}
          <div className="flex flex-wrap items-center gap-6 text-lg">
            {featuredPost.metadata.author && (
              <div className="flex items-center gap-3">
                {featuredPost.metadata.author.metadata?.profile_photo?.imgix_url && (
                  <img
                    src={`${featuredPost.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <span>{featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}</span>
              </div>
            )}
            
            {featuredPost.metadata.wave_height && (
              <div className="flex items-center gap-2">
                <span>🌊</span>
                <span>{featuredPost.metadata.wave_height}</span>
              </div>
            )}
            
            {featuredPost.metadata.surf_conditions && (
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span>{featuredPost.metadata.surf_conditions.value || featuredPost.metadata.surf_conditions}</span>
              </div>
            )}
          </div>
          
          {/* Read More Link */}
          <div className="mt-8">
            <a
              href={`/posts/${featuredPost.slug}`}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Read Full Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}