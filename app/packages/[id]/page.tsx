"use client";

import { useEffect, useState } from "react";
import { TravelPackageDetail } from "@/app/_components/travel-package-detail"
import type { TravelPackageDetailData } from "@/types/package-detail"
import { useParams, useRouter } from "next/navigation";

interface APIItineraryDay {
  day: number;
  title: string;
  route: string;
  meal_plan: string;
  notes: string;
  activities: string[];
  images: Array<{
    url: string;
    alt: string;
  }>;
}

interface APIGalleryItem {
  url: string;
  alt: string;
  caption: string;
}

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [packageData, setPackageData] = useState<TravelPackageDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/packages/${params.id}`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch package details');
        }

        const data = await response.json();
        
        // Transform API response to match our UI data structure
        const transformedData: TravelPackageDetailData = {
          id: data.package.id,
          title: data.package.title,
          subtitle: data.package.subtitle,
          heroImage: {
            url: data.package.hero_image_url,
            alt: data.package.hero_image_alt
          },
          overview: data.package.overview,
          activities_display_type: data.package.activities_display_type,
          highlights: [
            { id: "1", label: "Nature", icon: "nature" },
            { id: "2", label: "Adventure", icon: "adventure" },
            { id: "3", label: "Family Friendly", icon: "family" },
            { id: "4", label: "Culture", icon: "culture" },
          ],
          itinerary: data.package.itinerary.map((day: APIItineraryDay) => ({
            day: day.day,
            title: day.title,
            route: day.route,
            mealPlan: day.meal_plan ?? "Not Available",
            activities: day.activities,
            notes: day.notes,
            images: day.images
          })),
          gallery: data.package.gallery.map((item: APIGalleryItem, index: number) => ({
            id: String(index + 1),
            url: item.url,
            alt: item.alt,
            caption: item.caption
          })),
          bookingInfo: data.package.bookingInfo,
          cancellationPolicy: data.package.cancellationPolicy,
          contact: {
            phone: "+91-9876543210",
            whatsapp: "+91-9876543210",
            email: "info@yathrananda.com",
            socialLinks: {
              facebook: "https://facebook.com/yathrananda",
              instagram: "https://instagram.com/yathrananda",
              twitter: "https://twitter.com/yathrananda",
            },
          },
          price: {
            amount: data.package.price,
            currency: "₹",
            per: "per person",
          },
          duration: data.package.duration,
          groupSize: data.package.group_size,
        };

        setPackageData(transformedData);
      } catch (err) {
        console.error('Error fetching package details:', err);
        setError('Failed to load package details');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchPackageDetail();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-7xl mx-auto px-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-96 bg-muted rounded"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Package Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The package you're looking for doesn't exist or there was an error loading it.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return <TravelPackageDetail 
    data={packageData} 
    backUrl="/" 
    backLabel="Back to Home" 
  />
}
