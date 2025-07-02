import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Yathrananda",
  description:
    "The page you're looking for doesn't exist. Let's get you back on track to your next adventure.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors">
              Yathrananda
            </div>
          </Link>
        </div>

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <svg
            className="w-64 h-64 sm:w-80 sm:h-80"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="lost-traveler-title"
          >
            <title id="lost-traveler-title">
              Lost traveler looking at a map
            </title>

            {/* Background elements */}
            <circle cx="100" cy="80" r="40" fill="#fef3c7" opacity="0.6" />
            <circle cx="320" cy="120" r="25" fill="#dbeafe" opacity="0.8" />
            <circle cx="350" cy="300" r="35" fill="#f3e8ff" opacity="0.6" />

            {/* Mountains */}
            <path
              d="M0 250 L80 180 L160 220 L240 160 L320 200 L400 180 L400 400 L0 400 Z"
              fill="#e5e7eb"
            />
            <path
              d="M0 270 L60 220 L120 240 L180 200 L240 220 L300 200 L400 210 L400 400 L0 400 Z"
              fill="#d1d5db"
            />

            {/* Trees */}
            <ellipse cx="80" cy="280" rx="8" ry="20" fill="#16a34a" />
            <ellipse cx="320" cy="260" rx="10" ry="25" fill="#15803d" />
            <ellipse cx="280" cy="290" rx="6" ry="15" fill="#16a34a" />

            {/* Traveler */}
            <g transform="translate(180, 200)">
              {/* Body */}
              <ellipse cx="20" cy="60" rx="15" ry="25" fill="#3b82f6" />

              {/* Head */}
              <circle cx="20" cy="25" r="12" fill="#fbbf24" />

              {/* Hat */}
              <ellipse cx="20" cy="18" rx="15" ry="8" fill="#dc2626" />
              <ellipse cx="20" cy="15" rx="8" ry="3" fill="#dc2626" />

              {/* Arms */}
              <ellipse
                cx="8"
                cy="45"
                rx="4"
                ry="12"
                fill="#fbbf24"
                transform="rotate(-20 8 45)"
              />
              <ellipse
                cx="32"
                cy="45"
                rx="4"
                ry="12"
                fill="#fbbf24"
                transform="rotate(30 32 45)"
              />

              {/* Legs */}
              <ellipse cx="15" cy="85" rx="4" ry="15" fill="#1f2937" />
              <ellipse cx="25" cy="85" rx="4" ry="15" fill="#1f2937" />

              {/* Backpack */}
              <ellipse cx="12" cy="50" rx="8" ry="12" fill="#059669" />
              <rect x="8" y="45" width="8" height="3" fill="#047857" />

              {/* Map in hands */}
              <rect
                x="25"
                y="35"
                width="20"
                height="15"
                fill="#ffffff"
                stroke="#d1d5db"
                strokeWidth="1"
                transform="rotate(15 35 42)"
              />
              <line
                x1="28"
                y1="38"
                x2="42"
                y2="40"
                stroke="#ef4444"
                strokeWidth="1"
                transform="rotate(15 35 42)"
              />
              <line
                x1="30"
                y1="42"
                x2="40"
                y2="43"
                stroke="#3b82f6"
                strokeWidth="1"
                transform="rotate(15 35 42)"
              />
              <circle
                cx="35"
                cy="42"
                r="2"
                fill="#dc2626"
                transform="rotate(15 35 42)"
              />
            </g>

            {/* Question marks */}
            <text x="120" y="180" fontSize="24" fill="#6b7280" opacity="0.7">
              ?
            </text>
            <text x="280" y="170" fontSize="20" fill="#6b7280" opacity="0.5">
              ?
            </text>
            <text x="150" y="160" fontSize="18" fill="#6b7280" opacity="0.6">
              ?
            </text>

            {/* Path/Road */}
            <path
              d="M0 320 Q100 310 200 320 T400 330"
              stroke="#9ca3af"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
            />
          </svg>
        </div>

        {/* Error Content */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-foreground mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Oops! You've wandered off the beaten path
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            It looks like the page you're searching for has gone on an adventure
            of its own. Don't worry, even the best explorers sometimes take a
            wrong turn!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Return Home
          </Link>

          <Link
            href="/packages"
            className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Explore Packages
          </Link>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for destinations..."
              className="w-full px-4 py-3 pl-10 pr-4 text-foreground bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              aria-label="Search for destinations"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 underline"
            >
              Contact our travel experts
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
