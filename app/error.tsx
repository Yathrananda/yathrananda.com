"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
            aria-labelledby="maintenance-title"
          >
            <title id="maintenance-title">Travel maintenance in progress</title>

            {/* Background */}
            <rect width="400" height="400" fill="#fef7ed" />

            {/* Clouds */}
            <ellipse
              cx="80"
              cy="60"
              rx="30"
              ry="15"
              fill="#ffffff"
              opacity="0.8"
            />
            <ellipse
              cx="320"
              cy="80"
              rx="25"
              ry="12"
              fill="#ffffff"
              opacity="0.8"
            />
            <ellipse
              cx="200"
              cy="50"
              rx="35"
              ry="18"
              fill="#ffffff"
              opacity="0.8"
            />

            {/* Airplane (broken/maintenance) */}
            <g transform="translate(150, 120)">
              {/* Plane body */}
              <ellipse cx="50" cy="30" rx="40" ry="8" fill="#e5e7eb" />
              <ellipse cx="70" cy="30" rx="15" ry="6" fill="#d1d5db" />

              {/* Wings */}
              <ellipse
                cx="35"
                cy="30"
                rx="20"
                ry="4"
                fill="#9ca3af"
                transform="rotate(-10 35 30)"
              />
              <ellipse
                cx="35"
                cy="30"
                rx="20"
                ry="4"
                fill="#9ca3af"
                transform="rotate(10 35 30)"
              />

              {/* Tail */}
              <ellipse
                cx="15"
                cy="25"
                rx="8"
                ry="3"
                fill="#9ca3af"
                transform="rotate(-30 15 25)"
              />
              <ellipse
                cx="15"
                cy="35"
                rx="8"
                ry="3"
                fill="#9ca3af"
                transform="rotate(30 15 35)"
              />

              {/* Windows */}
              <circle cx="45" cy="28" r="2" fill="#3b82f6" opacity="0.6" />
              <circle cx="55" cy="28" r="2" fill="#3b82f6" opacity="0.6" />
              <circle cx="65" cy="28" r="2" fill="#3b82f6" opacity="0.6" />

              {/* Maintenance tools around plane */}
              <rect x="20" y="45" width="3" height="15" fill="#8b5cf6" />
              <circle cx="21.5" cy="42" r="3" fill="#a855f7" />

              <rect x="75" y="40" width="12" height="3" fill="#ef4444" />
              <rect x="80" y="35" width="3" height="12" fill="#ef4444" />
            </g>

            {/* Maintenance worker */}
            <g transform="translate(200, 220)">
              {/* Body */}
              <ellipse cx="20" cy="60" rx="12" ry="20" fill="#f97316" />

              {/* Head */}
              <circle cx="20" cy="30" r="10" fill="#fbbf24" />

              {/* Hard hat */}
              <ellipse cx="20" cy="25" rx="12" ry="6" fill="#eab308" />
              <rect x="17" y="22" width="6" height="2" fill="#ca8a04" />

              {/* Arms */}
              <ellipse
                cx="10"
                cy="50"
                rx="3"
                ry="10"
                fill="#fbbf24"
                transform="rotate(-30 10 50)"
              />
              <ellipse
                cx="30"
                cy="50"
                rx="3"
                ry="10"
                fill="#fbbf24"
                transform="rotate(20 30 50)"
              />

              {/* Legs */}
              <ellipse cx="15" cy="80" rx="3" ry="12" fill="#1f2937" />
              <ellipse cx="25" cy="80" rx="3" ry="12" fill="#1f2937" />

              {/* Tool in hand */}
              <rect
                x="32"
                y="45"
                width="8"
                height="2"
                fill="#6b7280"
                transform="rotate(20 36 46)"
              />
              <circle
                cx="40"
                cy="46"
                r="2"
                fill="#374151"
                transform="rotate(20 40 46)"
              />
            </g>

            {/* Toolbox */}
            <rect x="120" y="280" width="40" height="25" fill="#dc2626" />
            <rect x="125" y="275" width="30" height="5" fill="#b91c1c" />
            <circle cx="130" cy="290" r="2" fill="#374151" />
            <circle cx="150" cy="290" r="2" fill="#374151" />

            {/* Caution cones */}
            <g transform="translate(80, 260)">
              <path d="M10 40 L20 10 L30 40 Z" fill="#f97316" />
              <rect x="15" y="35" width="10" height="3" fill="#ffffff" />
            </g>

            <g transform="translate(300, 270)">
              <path d="M10 40 L20 10 L30 40 Z" fill="#f97316" />
              <rect x="15" y="35" width="10" height="3" fill="#ffffff" />
            </g>

            {/* Warning signs */}
            <rect
              x="50"
              y="180"
              width="30"
              height="30"
              fill="#fbbf24"
              transform="rotate(45 65 195)"
            />
            <text
              x="65"
              y="200"
              fontSize="16"
              fill="#dc2626"
              textAnchor="middle"
              fontWeight="bold"
            >
              !
            </text>
          </svg>
        </div>

        {/* Error Content */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-4">
            Oops! Something went wrong
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-4">
            Our travel experts are working on it
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're experiencing some technical turbulence, but don't worry! Our
            team is working hard to get everything back on track for your next
            adventure.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border rounded-md text-base font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Return Home
          </Link>
        </div>

        {/* Error Details (for development) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left max-w-2xl mx-auto">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 p-4 bg-muted rounded-lg text-xs text-muted-foreground overflow-auto">
              {error.message}
              {error.stack && "\n\n" + error.stack}
            </pre>
          </details>
        )}

        {/* Help Text */}
        <div className="mt-12 text-sm text-muted-foreground">
          <p>
            If the problem persists, please{" "}
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 underline"
            >
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
