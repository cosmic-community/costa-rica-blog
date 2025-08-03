interface LoadingProps {
  message?: string
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Surf-themed loading animation */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🏄‍♂️</span>
        </div>
      </div>
      
      {/* Loading message */}
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
      
      {/* Pura Vida message */}
      <p className="mt-2 text-sm text-gray-500">¡Pura Vida! 🌊</p>
    </div>
  )
}