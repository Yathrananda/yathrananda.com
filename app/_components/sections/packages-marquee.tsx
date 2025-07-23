"use client";

import { useEffect, useState } from "react";
import Marquee from "@/components/ui-layouts/marquee";
import { UpcomingPackage } from "@/types/package-detail";

const PackageCard = ({
  img,
  title,
  description,
  location,
}: {
  img: string;
  title: string;
  description: string;
  location: string;
}) => {
  return (
    <div className="relative w-80 h-48 cursor-pointer overflow-hidden rounded-2xl group">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="backdrop-blur-md bg-white/10 rounded-xl px-4 py-2 border border-white/20">
          <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1 font-cuprum">
            {title}
          </h3>
          <p className="text-white/90 text-sm line-clamp-1 leading-relaxed font-shanti">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const AllToursMarquee = () => {
  const [packages, setPackages] = useState<UpcomingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/packages`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data = await response.json();
        setPackages(data.packages);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Failed to load packages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background pt-20">
        <div className="animate-pulse flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-80 h-48 bg-muted rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || packages.length === 0) {
    return null;
  }

  const firstRow = packages.slice(0, Math.ceil(packages.length / 2));
  const secondRow = packages.slice(Math.ceil(packages.length / 2));

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background pt-20">
      <Marquee pauseOnHover className="[--duration:25s]">
        {firstRow.map((pkg) => (
          <PackageCard 
            key={pkg.id} 
            img={pkg.image_url || "/placeholder.jpg"}
            title={pkg.title || "Travel Package"}
            description={pkg.description || "Discover amazing destinations"}
            location={pkg.location || ""}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s]">
        {secondRow.map((pkg) => (
          <PackageCard 
            key={pkg.id} 
            img={pkg.image_url || "/placeholder.jpg"}
            title={pkg.title || "Travel Package"}
            description={pkg.description || "Discover amazing destinations"}
            location={pkg.location || ""}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default AllToursMarquee;
