"use client";
import { Calendar, MapPin, Users } from "lucide-react";
import type { TravelPackageDetailData } from "@/types/package-detail";
import { PackageOverview } from "./package-detail/package-overview";
import { PackageItinerary } from "./package-detail/package-itinerary";
import { BookingInfoSection } from "./package-detail/booking-info";
import { CancellationPolicySection } from "./package-detail/cancellation-policy";
import { ContactSection } from "./package-detail/contact-section";
import { GallerySection } from "./package-detail/gallery-section";
import { HeroSection } from "./package-detail/hero-section";
import { useState } from "react";
import Header from "./header";

interface TravelPackageDetailProps {
  data: TravelPackageDetailData;
  backUrl?: string;
  backLabel?: string;
}

export function TravelPackageDetail({
  data,
}: TravelPackageDetailProps) {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "gallery", label: "Gallery" },
    { id: "booking", label: "Booking Info" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection
        title={data.title}
        subtitle={data.subtitle}
        imageUrl={data.heroImage.url}
        imageAlt={data.heroImage.alt}
      />
      <nav className="sticky top-16 bg-background border-b z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`text-sm font-medium whitespace-nowrap ${
                  activeSection === section.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <PackageOverview overview={data.overview} highlights={[]} />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center p-4 bg-card rounded-lg border">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div className="p-3 rounded-full bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{data.duration}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-card rounded-lg border">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Group Size</p>
                  <p className="font-medium">{data.groupSize}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-card rounded-lg border sm:col-span-2 md:col-span-1">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">
                    {data.price.currency}{data.price.amount} {data.price.per}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <PackageItinerary itinerary={data.itinerary} activitiesDisplayType={data.activities_display_type} />
          <GallerySection images={data.gallery} />
          <BookingInfoSection
            bookingInfo={data.bookingInfo}
            contact={data.contact}
            packageTitle={data.title}
          />
          <CancellationPolicySection
            cancellationPolicy={data.cancellationPolicy}
          />
          <ContactSection contact={data.contact} />
        </div>
      </main>
    </div>
  );
}
