export interface PackageHighlight {
  id: string
  label: string
  icon: string
}

export interface ItineraryDay {
  day: number
  title: string
  route: string
  mealPlan: string
  activities: string[]
  notes: string
  images: Array<{
    url: string
    alt: string
  }>
}

export interface Attraction {
  id: string
  name: string
  description?: string
  image?: string
}

export interface BookingInfo {
  advancePayment: string
  balancePayment: string
  bookingRules: string[]
}

export interface CancellationPolicy {
  rules: string[]
}

export interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  socialLinks: {
    facebook: string
    instagram: string
    twitter: string
  }
}

export interface GalleryImage {
  id: string
  url: string
  alt: string
  caption?: string
}

export interface HeroMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  carousel_order: number;
}

export interface TravelPackageDetailData {
  id: string
  title: string
  subtitle: string
  heroImage: {
    url: string
    alt: string
  }
  overview: string
  highlights: Array<{
    id: string
    label: string
    icon: string
  }>
  activities_display_type: "points" | "description"
  itinerary: ItineraryDay[]
  gallery: GalleryImage[]
  bookingInfo: BookingInfo
  cancellationPolicy: CancellationPolicy
  contact: ContactInfo
  price: {
    amount: number
    currency: string
    per: string
  }
  duration: string
  groupSize: string
}

export interface UpcomingPackage {
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
