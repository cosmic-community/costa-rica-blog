import type { AuthorCardProps } from '@/types'

export default function AuthorCard({ author, className = '' }: AuthorCardProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Profile Photo */}
      {author.metadata?.profile_photo ? (
        <img
          src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
          alt={author.metadata?.name || author.title}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">
          <span className="text-ocean-600 font-semibold text-lg">
            {(author.metadata?.name || author.title).charAt(0)}
          </span>
        </div>
      )}

      {/* Author Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {author.metadata?.name || author.title}
        </p>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          {author.metadata?.years_surfing && (
            <span>🏄‍♂️ {author.metadata.years_surfing} years</span>
          )}
          {author.metadata?.instagram && (
            <a
              href={`https://instagram.com/${author.metadata.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ocean-600 hover:text-ocean-700 transition-colors"
            >
              @{author.metadata.instagram}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}