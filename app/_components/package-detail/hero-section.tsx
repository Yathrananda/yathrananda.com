import Image from 'next/image'

interface HeroSectionProps {
  title: string
  subtitle: string
  imageUrl: string
  imageAlt: string
}

export function HeroSection({ title, subtitle, imageUrl, imageAlt }: HeroSectionProps) {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl opacity-90">{subtitle}</p>
      </div>
    </div>
  )
} 