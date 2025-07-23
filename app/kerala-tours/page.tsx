"use client";
import PackagesSectionType from "@/app/_components/packages-section";
import Header from "../_components/header";
import SimpleFooter from "../_components/simple-footer";

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 transition-all duration-200"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <PackagesSectionType title="Popular Destinations in Kerala" />
      </main>
      <SimpleFooter />
    </div>
  );
}
