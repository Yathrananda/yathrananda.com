"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

interface PackageCardProps {
  package: {
    id: string;
    title?: string;
    location?: string;
    duration?: string;
    price?: string | number;
    image_url?: string;
    hero_image_alt?: string;
    description?: string;
  };
  aspectRatio?: "square" | "landscape";
  showRoute?: boolean;
  type?: "upcoming" | "trending" | "international" | "domestic";
}

const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  aspectRatio = "square",
  showRoute = false,
  type = "upcoming",
}) => {
  return (
    <motion.div
      className="group relative bg-card rounded-xl overflow-hidden border border-border transition-all duration-200 ease-out hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/packages/${pkg.id}`} className="block">
        <div className={`relative ${aspectRatio === "square" ? "aspect-square" : "aspect-[4/3]"}`}>
          <Image
            src={pkg.image_url || "/placeholder.jpg"}
            alt={pkg.hero_image_alt || pkg.title || "Travel package"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <div className="p-4">
          {pkg.title && (
            <h3 className="font-semibold text-card-foreground mb-2 line-clamp-1">
              {pkg.title}
            </h3>
          )}

          <div className="space-y-2">
            {pkg.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>{pkg.location}</span>
              </div>
            )}

            {pkg.duration && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>{pkg.duration}</span>
              </div>
            )}

            {typeof pkg.price !== 'undefined' && (
              <div className="flex items-center justify-between mt-3">
                <div className="text-primary font-semibold">
                  ${typeof pkg.price === 'number' ? pkg.price.toLocaleString() : pkg.price}
                </div>
              </div>
            )}
          </div>

          {pkg.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {pkg.description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default PackageCard;
