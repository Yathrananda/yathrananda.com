import type React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmsans",
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title:
    "Yathrananda - Explore the World, One Journey at a Time | Premium Travel Agency",
  description:
    "Discover personalized travel experiences with Yathrananda. Book flights, hotels, and adventure tours to Thailand, Tokyo, Chicago and more. Expert trip planning and 24/7 support.",
  keywords:
    "travel agency, vacation packages, flight booking, hotel reservations, adventure tours, trip planning, Thailand travel, Tokyo tours, Chicago trips",
  authors: [{ name: "Yathrananda Travel Agency" }],
  creator: "Yathrananda",
  publisher: "Yathrananda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://Yathrananda.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yathrananda - Premium Travel Agency | Explore the World",
    description:
      "Discover personalized travel experiences with Yathrananda. Expert trip planning, adventure tours, and 24/7 support for your perfect journey.",
    url: "https://Yathrananda.com",
    siteName: "Yathrananda Travel Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yathrananda Travel Agency - Explore the World",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yathrananda - Premium Travel Agency",
    description:
      "Discover personalized travel experiences with expert trip planning and 24/7 support.",
    images: ["/twitter-image.jpg"],
    creator: "@Yathrananda_travel",
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmsans.variable}>
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="hsl(142.1 76.2% 36.3%)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${dmsans.className} antialiased bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        {children}
        
        {/* Microsoft Clarity Script */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "shgcpqz2zf");
            `,
          }}
        />
      </body>
    </html>
  );
}
