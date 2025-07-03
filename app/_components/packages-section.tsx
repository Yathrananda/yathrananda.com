"use client";

import { useState, useCallback } from "react";
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface TravelPackage {
  id: string;
  from: string;
  to: string;
  destination: string;
  duration: string;
  date: string;
  price: string;
  originalPrice?: string;
  image: string;
  alt: string;
  trending: boolean;
  discountPercentage?: number;
  category?: string;
}

interface PackagesSectionProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
}

const allPackages: TravelPackage[] = [
  {
    id: "thailand-adventure",
    from: "Dhaka",
    to: "Bangkok",
    destination: "Thailand",
    duration: "7 days 6 nights",
    date: "Mar 15 - Mar 22",
    price: "$870",
    originalPrice: "$1,200",
    image: "/images/packages/thailand.jpg",
    alt: "Beautiful beaches and temples in Thailand - MALVORA travel package",
    trending: true,
    discountPercentage: 28,
    category: "international",
  },
  {
    id: "tokyo-cultural",
    from: "Dhaka",
    to: "Tokyo",
    destination: "Tokyo",
    duration: "5 days 4 nights",
    date: "Apr 10 - Apr 15",
    price: "$1,150",
    originalPrice: "$1,400",
    image: "/images/packages/tokyo.jpg",
    alt: "Modern cityscape and traditional culture in Tokyo - MALVORA travel package",
    trending: true,
    discountPercentage: 18,
    category: "international",
  },
  {
    id: "chicago-city",
    from: "Dhaka",
    to: "Chicago",
    destination: "Chicago",
    duration: "6 days 5 nights",
    date: "May 20 - May 26",
    price: "$1,320",
    image: "/images/packages/chicago.jpg",
    alt: "Stunning architecture and lakefront views in Chicago - MALVORA travel package",
    trending: false,
    category: "international",
  },
  {
    id: "coxs-bazar-beach",
    from: "Dhaka",
    to: "Cox's Bazar",
    destination: "Cox's Bazar",
    duration: "3 days 2 nights",
    date: "Jun 5 - Jun 8",
    price: "$180",
    originalPrice: "$250",
    image: "/images/packages/coxs-bazar.jpg",
    alt: "World's longest natural sea beach in Cox's Bazar - MALVORA travel package",
    trending: true,
    discountPercentage: 28,
    category: "domestic",
  },
  {
    id: "sylhet-tea-gardens",
    from: "Dhaka",
    to: "Sylhet",
    destination: "Sylhet",
    duration: "4 days 3 nights",
    date: "Jul 12 - Jul 16",
    price: "$220",
    image: "/images/packages/sylhet.jpg",
    alt: "Lush tea gardens and natural beauty in Sylhet - MALVORA travel package",
    trending: false,
    category: "domestic",
  },
  {
    id: "bandarban-hills",
    from: "Dhaka",
    to: "Bandarban",
    destination: "Bandarban",
    duration: "5 days 4 nights",
    date: "Aug 8 - Aug 13",
    price: "$280",
    originalPrice: "$350",
    image: "/images/packages/bandarban.jpg",
    alt: "Scenic hill tracts and tribal culture in Bandarban - MALVORA travel package",
    trending: true,
    discountPercentage: 20,
    category: "domestic",
  },
  {
    id: "sundarbans-mangrove",
    from: "Dhaka",
    to: "Sundarbans",
    destination: "Sundarbans",
    duration: "3 days 2 nights",
    date: "Sep 15 - Sep 18",
    price: "$320",
    image: "/images/packages/sundarbans.jpg",
    alt: "Mangrove forests and Royal Bengal Tigers in Sundarbans - MALVORA travel package",
    trending: false,
    category: "domestic",
  },
  {
    id: "rangamati-lake",
    from: "Dhaka",
    to: "Rangamati",
    destination: "Rangamati",
    duration: "4 days 3 nights",
    date: "Oct 20 - Oct 24",
    price: "$240",
    originalPrice: "$300",
    image: "/images/packages/rangamati.jpg",
    alt: "Serene lakes and tribal heritage in Rangamati - MALVORA travel package",
    trending: true,
    discountPercentage: 20,
    category: "domestic",
  },
  {
    id: "dubai-luxury",
    from: "Dhaka",
    to: "Dubai",
    destination: "Dubai",
    duration: "5 days 4 nights",
    date: "Nov 10 - Nov 15",
    price: "$950",
    originalPrice: "$1,200",
    image: "/images/packages/dubai.jpg",
    alt: "Luxury shopping and modern architecture in Dubai - MALVORA travel package",
    trending: true,
    discountPercentage: 21,
    category: "international",
  },
  {
    id: "singapore-city",
    from: "Dhaka",
    to: "Singapore",
    destination: "Singapore",
    duration: "4 days 3 nights",
    date: "Dec 5 - Dec 9",
    price: "$780",
    image: "/images/packages/singapore.jpg",
    alt: "Garden city and cultural diversity in Singapore - MALVORA travel package",
    trending: false,
    category: "international",
  },
  {
    id: "kuakata-beach",
    from: "Dhaka",
    to: "Kuakata",
    destination: "Kuakata",
    duration: "2 days 1 night",
    date: "Jan 15 - Jan 17",
    price: "$120",
    originalPrice: "$160",
    image: "/images/packages/kuakata.jpg",
    alt: "Panoramic sea beach and sunrise views in Kuakata - MALVORA travel package",
    trending: false,
    discountPercentage: 25,
    category: "domestic",
  },
  {
    id: "sajek-valley",
    from: "Dhaka",
    to: "Sajek",
    destination: "Sajek Valley",
    duration: "3 days 2 nights",
    date: "Feb 20 - Feb 23",
    price: "$200",
    image: "/images/packages/sajek.jpg",
    alt: "Cloud-kissed hills and tribal culture in Sajek Valley - MALVORA travel package",
    trending: true,
    category: "domestic",
  },
];

export default function PackagesSection({
  title = "Popular Travel Destinations",
  subtitle = "Discover our handpicked travel packages designed to create unforgettable memories.",
  showSearch = true,
}: PackagesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(8);

  // Filter packages based on search
  const filteredPackages = allPackages.filter(
    (pkg) =>
      searchQuery === "" ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.category?.toLowerCase().includes(searchQuery.toLowerCase())
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
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <Link href={`/packages/${pkg.id}`}>
                <article className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {/* Image */}
                  <div className="relative h-48">
                    <Image
                      src={pkg.image}
                      alt={pkg.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {pkg.trending && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                          Trending
                        </span>
                      )}
                      {pkg.discountPercentage && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                          {pkg.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {pkg.from} → {pkg.to}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {pkg.destination}
                    </h3>

                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <span className="mr-3">{pkg.duration}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{pkg.date}</span>
                    </div>

                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-muted-foreground">
                            Starting from
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">
                              {pkg.price}
                            </span>
                            {pkg.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {pkg.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
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
