export interface PackageHighlight {
  id: string
  label: string
  icon: string
}

export interface ItineraryDay {
  day: number
  title: string
  route?: string
  mealPlan: string
  activities: string[]
  notes?: string
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
  email?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

export interface TravelPackageDetailData {
  id: string
  title: string
  subtitle: string
  overview: string
  highlights: PackageHighlight[]
  itinerary: ItineraryDay[]
  topAttractions: Attraction[]
  bookingInfo: BookingInfo
  cancellationPolicy: CancellationPolicy
  contact: ContactInfo
  images?: string[]
  price?: {
    amount: number
    currency: string
    per: string
  }
  duration?: string
  groupSize?: string
}
