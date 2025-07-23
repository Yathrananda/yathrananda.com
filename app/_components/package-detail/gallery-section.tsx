import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'

interface GalleryImage {
  id: string
  url: string
  alt: string
  caption?: string
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export function GallerySection({ images }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <>
      <div id="gallery" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {images.filter((image) => image.url).map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        {selectedImage && (
          <div className="relative aspect-video mb-12">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              fill
              className="object-contain"
            />
            {selectedImage.caption && (
              <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                {selectedImage.caption}
              </p>
            )}
          </div>
        )}
      </Dialog>
    </>
  )
} 