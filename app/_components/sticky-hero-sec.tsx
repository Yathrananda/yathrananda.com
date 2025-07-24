"use client";

import { TravelPackageDetailData } from "@/types/package-detail";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import { HeroSection } from "./package-detail/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, DollarSign, MapPin, Users, X } from "lucide-react";

interface TravelPackageDetailProps {
  data: TravelPackageDetailData;
  backUrl?: string;
  backLabel?: string;
}

export default function StickyHeroSec({ data }: TravelPackageDetailProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <main ref={container} className="relative h-[200vh] bg-white  ">
        <Section1 scrollYProgress={scrollYProgress} data={data} />
        <Section2 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />

      </main>
    </>
  );
}

const Section1 = ({
  scrollYProgress,
  data,
}: {
  scrollYProgress: any;
  data: TravelPackageDetailData;
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky  font-semibold top-0 h-screen bg-gradient-to-t to-gray-50 from-background flex flex-col items-center justify-center text-black"
    >
      <div className="relative w-full h-full">
        <div className="border-0 bg-white/80 backdrop-blur-sm">
          <div className="p-6 md:p-8 space-y-8">
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <p className="text-slate-700 leading-relaxed text-lg font-shanti font-medium">
                  Embark on an unforgettable journey through the enchanting
                  landscapes of Southeast Asia. This carefully curated 7-day
                  adventure takes you through bustling markets, ancient temples,
                  pristine beaches, and vibrant cultural sites. Experience
                  authentic local cuisine, stay in handpicked accommodations,
                  and create memories that will last a lifetime. Our expert
                  guides will ensure you discover hidden gems while enjoying the
                  comfort and safety of a well-organized tour.
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
                  {data.inclusions.map((item, index) => (
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
                  {data.exclusions.map((item, index) => (
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
    </motion.section>
  );
};

const Section2 = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="relative h-screen bg-gradient-to-t to-gray-50 from-background text-black "
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <article className="container mx-auto relative z-10 ">
        <h1 className="text-6xl leading-[100%] py-10 font-semibold  tracking-tight ">
          Images That doesn't Make any sense <br /> but still in this section
        </h1>
        <div className="grid grid-cols-4 gap-4">
          <img
            src="https://images.unsplash.com/photo-1717893777838-4e222311630b?w=1200&auto=format&fit=crop"
            alt="img"
            className=" object-cover w-full rounded-md h-full"
          />
          <img
            src="https://images.unsplash.com/photo-1717618389115-88db6d7d8f77?w=500&auto=format&fit=crop"
            alt="img"
            className=" object-cover w-full rounded-md"
          />
          <img
            src="https://images.unsplash.com/photo-1717588604557-55b2888f59a6?w=500&auto=format&fit=crop"
            alt="img"
            className=" object-cover w-full rounded-md h-full"
          />
          <img
            src="https://images.unsplash.com/photo-1713417338603-1b6b72fcade2?w=500&auto=format&fit=crop"
            alt="img"
            className=" object-cover w-full rounded-md h-full"
          />
        </div>
      </article>
    </motion.section>
  );
};
