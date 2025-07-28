import type React from "react";
import type { Metadata } from "next";
import { Voltaire, Cuprum, Shanti } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisReactProvider from "./lenis-react-provider";

const voltaire = Voltaire({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-voltaire",
  weight: ["400"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

const cuprum = Cuprum({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cuprum",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

const shanti = Shanti({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shanti",
  weight: ["400"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    default: "Yathrananda - Where Every Trip Becomes a Story | Trusted Travel Planners",
    template: "%s | Yathrananda Travel Agency"
  },
  description:
    "Explore the world your way with Yathrananda. Book custom travel packages including flights, stays, and tours to top global destinations—backed by expert support.",
  keywords: [
    "travel agency",
    "vacation packages", 
    "trip planning",
    "Thailand travel",
    "Kerala tours",
    "domestic tours",
    "international tours",
    "customized tours",
    "best travel agency",
    "best travel agency in kerala",
    "best travel agency in india",
    "book my trip online",
    "online travel agency India",
    "travel offers today",
    "trip planner website",
    "travel booking portal",
    "family tour packages",
    "honeymoon travel agency",
    "student travel deals",
    "senior citizen holiday packages",
    "group travel bookings",
    "family tour packages",
  ],
  authors: [{ name: "Yathrananda Travel Agency", url: "https://yathrananda.com" }],
  creator: "Yathrananda",
  publisher: "Yathrananda",
  category: "Travel & Tourism",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yathrananda.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yathrananda - Where Every Trip Becomes a Story | Trusted Travel Planners",
    description:
      "Explore the world your way with Yathrananda. Book custom travel packages including flights, stays, and tours to top global destinations—backed by expert support.",
    url: "https://yathrananda.com",
    siteName: "Yathrananda Travel Agency",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Yathrananda Travel Agency - Explore the World",
        type: "image/jpeg",
      },
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Yathrananda Logo",
        type: "image/png",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yathrananda - Where Every Trip Becomes a Story | Trusted Travel Planners",
    description:
      "Explore the world your way with Yathrananda. Book custom travel packages including flights, stays, and tours to top global destinations—backed by expert support.",
    images: ["/images/icon.png"],
    creator: "@Yathranand",
    site: "@Yathrananda",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  verification: {
    google: "your-google-C4u9ztHLPVnZGBIV8UFqjDPStjulhliyLW2d7jVogbU-code"
  },
  other: {
    "msapplication-TileColor": "hsl(142.1 76.2% 36.3%)",
    "msapplication-config": "/browserconfig.xml",
  },
};

// Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Yathrananda Travel Agency',
  alternateName: 'Yathrananda',
  description: 'Explore the world your way with Yathrananda. Book custom travel packages including flights, stays, and tours to top global destinations—backed by expert support.',
  url: 'https://yathrananda.com',
  logo: 'https://yathrananda.com/images/icon.png',
  image: 'https://yathrananda.com/images/icon.png',
  telephone: '+917593873555',
  email: 'support@yathrananda.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Kerala',
  },
  sameAs: [
    'https://www.facebook.com/p/Yathrananda-100088112573328',
    'https://www.instagram.com/yathrananda',
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    offerCount: '100+',
    offers: [
      {
        '@type': 'Offer',
        name: 'International Tour Packages',
        description: 'Customized international travel packages to destinations worldwide'
      },
      {
        '@type': 'Offer', 
        name: 'Domestic Tour Packages',
        description: 'Explore India with our expertly crafted domestic tour packages'
      },
      {
        '@type': 'Offer',
        name: 'Kerala Special Tours',
        description: 'Experience Gods Own Country with our specialized Kerala tour packages'
      }
    ]
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Travel Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'TouristTrip',
          name: 'International Tours',
          description: 'Explore world destinations with our international tour packages'
        }
      },
      {
        '@type': 'Offer', 
        itemOffered: {
          '@type': 'TouristTrip',
          name: 'Domestic Tours',
          description: 'Discover incredible India with our domestic travel packages'
        }
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '500+'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${voltaire.variable} ${cuprum.variable} ${shanti.variable}`}
    >
      <head>
        {/* Essential meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="hsl(142.1 76.2% 36.3%)" />
        <meta name="color-scheme" content="light" />
        
        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://widgets.sociablekit.com" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/logo.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/loading-animation.json"
          as="fetch"
          crossOrigin="anonymous"
          type="application/json"
        />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/icon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-512.png" sizes="512x512" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Microsoft specific */}
        <meta name="msapplication-TileColor" content="hsl(142.1 76.2% 36.3%)" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//widgets.sociablekit.com" />
      </head>
      <body
        className={`${shanti.className} antialiased bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <LenisReactProvider>{children}</LenisReactProvider>
        
        {/* Microsoft Clarity - Lazy loaded with privacy considerations */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  
                  // Set cookie consent flag
                  if (typeof window !== 'undefined') {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: 'clarity_loaded',
                      clarity_id: 'shgcpqz2zf'
                    });
                  }
              })(window, document, "clarity", "script", "shgcpqz2zf");
            `,
          }}
        />
      </body>
    </html>
  );
}
