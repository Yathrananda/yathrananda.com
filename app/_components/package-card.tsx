"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, Plane, Train, Users } from "lucide-react";
import { usePathname } from "next/navigation";

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
    departure_date?: string;
    departure_place?: string;
    departure_type?: string;
  };
  aspectRatio?: "square" | "landscape";
  showRoute?: boolean;
  type?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  aspectRatio = "square",
  showRoute = false,
  type = "upcoming",
}) => {
  const pathname = usePathname();
  return (
    <motion.div
      className="group relative bg-card rounded-xl overflow-hidden border border-border/90 transition-all duration-300 ease-out hover:shadow-xl hover:border-border/80"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/packages/${pkg.id}`} className="block">
        <div
          className={cn(
            "relative",
            aspectRatio === "square" ? "aspect-square" : "aspect-[4/3]"
          )}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 group-hover:scale-105 transition-all duration-300" />

          <Image
            src={pkg.image_url || "/placeholder.jpg"}
            alt={pkg.hero_image_alt || pkg.title || "Travel package"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Price tag */}
          {typeof pkg.price !== "undefined" && (
            <div className="absolute bottom-4 right-4 z-20">
              <div className="relative overflow-hidden">
                {/* Blur background with gradient */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl" />
                <div className="relative px-4 py-2 bg-gradient-to-r from-primary/80 to-primary rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-lg font-medium text-primary-foreground">
                      ₹
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-primary-foreground">
                      {typeof pkg.price === "number"
                        ? pkg.price.toLocaleString("en-IN")
                        : pkg.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-primary-foreground/90 font-medium">
                    <Users className="w-3 h-3" />
                    <span>per person</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Type badge */}
          {(type && !["all", "none"].includes(type)) && (
            <>
              {type && type !== "upcoming" && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-sm text-xs font-medium text-white capitalize">
                    {type}
                  </div>
                </div>
              )}
            </>
          )}
          {type && type === "upcoming" && pkg.departure_date && (
            <div className="absolute top-4 left-4 z-20">
              <div className="px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-sm text-xs font-medium text-white capitalize">
                Departing on{" "}
                {new Date(pkg.departure_date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          {pkg.title && (
            <h3 className="font-semibold text-xl text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {pkg.title}
            </h3>
          )}

          <div className="space-y-1">
            {pkg.location && (
              <div className="flex items-center text-md text-muted-foreground">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span className="line-clamp-1">{pkg.location}</span>
              </div>
            )}

            {pkg.duration && (
              <div className="flex items-center text-md text-muted-foreground">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                <span>{pkg.duration}</span>
              </div>
            )}

            {(type && type === "upcoming" || pathname !== "/") && (
              <>
                {pkg.departure_place && pkg.departure_type ? (
                  <div className="flex items-center text-md text-muted-foreground">
                    {pkg.departure_type === "plane" ? (
                      <Plane className="w-5 h-5 mr-2 text-primary" />
                    ) : (
                      <Train className="w-5 h-5 mr-2 text-primary" />
                    )}
                    <span>Departing from {pkg.departure_place}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-md text-muted-foreground">
                    Departing: Not Specified
                  </div>
                )}
              </>
            )}
          </div>

          {/* {pkg.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 pt-1">
              {pkg.description}
            </p>
          )} */}
        </div>
      </Link>
    </motion.div>
  );
};

export default PackageCard;
