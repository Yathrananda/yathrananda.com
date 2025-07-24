import { Clock, IndianRupee, Users } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  duration?: string;
  groupSize?: string;
  price?: string | number;
}

export function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  duration,
  groupSize,
  price,
}: HeroSectionProps) {
  return (
    <div className="relative h-[45vh] min-h-[200px] w-full">
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
      <div className="absolute bottom-0 right-0 p-8 text-white">
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-3 p-4 backdrop-blur-md rounded-xl bg-[#00000011]">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium font-cuprum">Duration</p>
              <p className="text-lg font-bold font-cuprum">
                {duration}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-[#00000011] backdrop-blur-md rounded-xl">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium font-cuprum">Group Size</p>
              <p className="text-lg font-bold font-cuprum">{groupSize}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-[#00000011] backdrop-blur-md rounded-xl">
            <div className="p-2 bg-amber-600 rounded-lg">
              <IndianRupee className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium font-cuprum">Price</p>
              <p className="text-lg font-bold font-cuprum">
                {price} / person
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
