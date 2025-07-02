export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-3xl font-bold text-primary">Yathrananda</div>
        </div>

        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto animate-spin"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32 8L40 24H56L44 32L56 40H40L32 56L24 40H8L20 32L8 24H24L32 8Z"
              fill="currentColor"
              className="text-primary"
            />
          </svg>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Preparing your journey...</h2>
          <p className="text-secondary-foreground">Please wait while we load your travel experience</p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}