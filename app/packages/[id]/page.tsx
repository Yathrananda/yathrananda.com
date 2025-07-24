"use client";

import { useEffect, useRef, useState } from "react";
import type { TravelPackageDetailData } from "@/types/package-detail";
import { useParams, useRouter } from "next/navigation";
import { animate, scroll, spring } from "motion";
import { HeroSection } from "@/app/_components/package-detail/hero-section";
import { Check, X } from "lucide-react";
import HorizontalScrollSection from "@/app/_components/horizontal-on-vertical-scroll";
import GalleryModal from "@/app/_components/gallery-modal";
import { ContactSection } from "@/app/_components/package-detail/contact-section";
import { TestimonialsSection } from "@/app/_components/package-detail/testimonials-section";
import { BookingInfoSection } from "@/app/_components/package-detail/booking-info";
import { CancellationPolicySection } from "@/app/_components/package-detail/cancellation-policy";
import SimpleFooter from "@/app/_components/simple-footer";
import { BookingAndCancellationSection } from "@/app/_components/booking-and-cancel-info";

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
  const [packageData, setPackageData] =
    useState<TravelPackageDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const items = document.querySelectorAll("li");

    if (ulRef.current) {
      const controls = animate(
        ulRef.current,
        {
          transform: ["none", `translateX(-${items.length - 1}00vw)`],
        } as any,
        { easing: spring() } as any
      );
      scroll(controls, { target: document.querySelector("section") } as any);
    }

    const segmentLength = 1 / items.length;
    items.forEach((item, i) => {
      const header = item.querySelector("h2");

      scroll(animate([header], { x: [800, -800] }), {
        target: document.querySelector("section") as any,
        offset: [
          [i * segmentLength, 1],
          [(i + 1) * segmentLength, 0],
        ],
      });
    });
  }, []);

  useEffect(() => {
    const fetchPackageDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/api/packages/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch package details");
        }

        const data = await response.json();

        const transformedData: TravelPackageDetailData = {
          id: data.package.id,
          title: data.package.title,
          subtitle: data.package.subtitle,
          heroImage: {
            url: data.package.hero_image_url,
            alt: data.package.hero_image_alt,
          },
          overview: data.package.overview,
          activities_display_type: data?.package?.activities_display_type,
          highlights: [
            { id: "1", label: "Nature", icon: "nature" },
            { id: "2", label: "Adventure", icon: "adventure" },
            { id: "3", label: "Family Friendly", icon: "family" },
            { id: "4", label: "Culture", icon: "culture" },
          ],
          itinerary: data?.package?.itinerary.map((day: APIItineraryDay) => ({
            day: day.day,
            title: day.title,
            route: day.route,
            mealPlan: day.meal_plan ?? "Not Available",
            activities: day.activities,
            notes: day.notes,
            images: day.images,
          })),
          gallery: data?.package?.gallery.map(
            (item: APIGalleryItem, index: number) => ({
              id: String(index + 1),
              url: item.url,
              alt: item.alt,
              caption: item.caption,
            })
          ),
          bookingInfo: data?.package?.bookingInfo,
          cancellationPolicy: data?.package?.cancellationPolicy,
          contact: {
            phone: "+917593873555",
            whatsapp: "+917593873555",
            email: "support@yathrananda.com",
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
          duration: data?.package?.duration,
          groupSize: data?.package?.group_size,
          testimonials: data?.package?.testimonials || [],
          inclusions: data?.package?.inclusions || [],
          exclusions: data?.package?.exclusions || [],
        };

        setPackageData(transformedData);
      } catch (err) {
        console.error("Error fetching package details:", err);
        setError("Failed to load package details");
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
            The package you're looking for doesn't exist or there was an error
            loading it.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection
        title={packageData.title}
        subtitle={packageData.subtitle}
        imageUrl={packageData.heroImage.url}
        imageAlt={packageData.heroImage.alt}
        duration={packageData.duration}
        groupSize={packageData.groupSize}
        price={packageData.price.amount}
      />
      <div className="relative w-full h-full p-4 md:px-12">
        <div className="border-0 bg-white/80 backdrop-blur-sm">
          <div className="p-6 md:p-8 space-y-8">
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <p className="text-slate-700 leading-relaxed text-lg font-shanti font-medium whitespace-pre-line">
                  {packageData.overview}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 font-cuprum">
                    What's Included
                  </h3>
                </div>
                <div className="space-y-3">
                  {packageData.inclusions.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="mt-1 p-1 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-base text-slate-700 leading-relaxed font-shanti font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-red-100 rounded-full">
                    <X className="h-4 w-4 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 font-cuprum">
                    What's Not Included
                  </h3>
                </div>
                <div className="space-y-3">
                  {packageData.exclusions.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="mt-1 p-1 bg-red-50 rounded-full group-hover:bg-red-100 transition-colors">
                        <X className="h-3 w-3 text-red-600" />
                      </div>
                      <p className="text-base text-slate-700 leading-relaxed font-shanti font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HorizontalScrollSection
        items={packageData.itinerary}
        activities_display_type={packageData.activities_display_type}
      />

      <GalleryModal images={packageData.gallery} />
      <main className="px-4 sm:px-6 md:px-12">
        <TestimonialsSection testimonials={packageData.testimonials} />
        <BookingAndCancellationSection
          bookingInfo={packageData.bookingInfo}
          cancellationPolicy={packageData.cancellationPolicy}
          contact={packageData.contact}
          packageTitle={packageData.title}
        />
        <ContactSection contact={packageData.contact} />
      </main>
      <SimpleFooter />
    </>
  );
}
