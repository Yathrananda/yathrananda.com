"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import PackageCard from "./package-card";

interface Package {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  price: number;
  duration: string;
  location: string;
  image_url: string;
  hero_image_url: string;
  hero_image_alt: string;
  group_size: string;
  advance_payment: string;
  balance_payment: string;
}

interface PackagesSectionProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
}

export default function PackagesSection({
  title = "Popular Travel Destinations",
  subtitle = "Discover our handpicked travel packages designed to create unforgettable memories.",
  showSearch = true,
}: PackagesSectionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [displayCount, setDisplayCount] = useState(8);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let endpoint = '/api/packages';

        // Determine the API endpoint based on pathname
        if (pathname.includes('international-tours')) {
          endpoint = '/api/packages/international';
          setType("international");
        } else if (pathname.includes('domestic-tours')) {
          endpoint = '/api/packages/domestic';
          setType("domestic");
        } else if (pathname.includes('upcoming-tours')) {
          endpoint = '/api/packages/upcoming';
          setType("upcoming");
        } else if (pathname.includes('trending-tours')) {
          endpoint = '/api/packages/trending';
          setType("trending");
        } else if (pathname.includes('kerala-tours')) {
          endpoint = '/api/packages/kerala';
          setType("kerala");
        } else if (pathname.includes('customised-tours')) {
          endpoint = '/api/packages/customised';
          setType("customised");
        } else {
          endpoint = '/api/packages';
          setType("all");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }

        const data = await response.json();
        setPackages(data.packages);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError('Failed to load packages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, [pathname]);

  // Filter packages based on search
  const filteredPackages = packages.filter(
    (pkg) =>
      searchQuery === "" ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get currently visible packages
  const visiblePackages = filteredPackages.slice(0, displayCount);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setDisplayCount(8); // Reset display count when searching
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => prev + 8);
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-muted rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-xl overflow-hidden shadow-lg">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-4">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-muted rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="h-8 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-8">{subtitle}</p>

          {/* Search Bar */}
          {showSearch && (
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-1 focus:ring-foreground outline-none"
              />
            </div>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visiblePackages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} type={type as any} aspectRatio="landscape" />
          ))}
        </div>

        {visiblePackages.length < filteredPackages.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-primary-foreground rounded-lg transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No packages found matching your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
