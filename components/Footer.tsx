export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🏄‍♂️</span>
            <span className="text-xl font-bold text-gray-900">Costa Rica Surf</span>
          </div>
          
          <p className="text-gray-600 mb-4">
            Your ultimate guide to surfing in Costa Rica
          </p>
          
          <div className="text-sm text-gray-500">
            <p>¡Pura Vida! 🤙</p>
            <p className="mt-2">© {currentYear} Costa Rica Surf Blog. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}