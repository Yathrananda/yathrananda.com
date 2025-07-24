"use client";

import { Star, Quote, X } from "lucide-react";
import type { Testimonial } from "@/types/package-detail";
import { useState } from "react";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
        Booking & Cancellation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-card border rounded-lg p-6 hover:shadow-sm transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedTestimonial(testimonial)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 5 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-4">
                  "{testimonial.message}"
                </p>
                <div className="flex items-center gap-3">
                  {testimonial.image_url && (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.client_name}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  )}
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {testimonial.client_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedTestimonial && (
        <div
          onClick={() => {
            setSelectedTestimonial(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-card border rounded-lg p-8 max-w-md w-full relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setSelectedTestimonial(null)}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              {selectedTestimonial.image_url && (
                <img
                  src={selectedTestimonial.image_url}
                  alt={selectedTestimonial.client_name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              )}
              <div>
                <p className="font-bold text-lg text-foreground">
                  {selectedTestimonial.client_name}
                </p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 5 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="text-muted-foreground mb-2">
              "{selectedTestimonial.message}"
            </blockquote>
          </div>
        </div>
      )}

      {testimonials.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Quote className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            No testimonials available yet. Be the first to share your
            experience!
          </p>
        </div>
      )}
    </section>
  );
}
