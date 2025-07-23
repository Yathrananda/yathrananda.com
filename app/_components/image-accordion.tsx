"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const items = [
  {
    id: 1,
    url: "/images/ling-tang-yBroAF1cN3I-unsplash.jpg",
    title: "China",
    description:
      "Walk the ancient path of one of the world's greatest wonders.",
    tags: ["china", "history", "landmark"],
  },
  {
    id: 2,
    url: "/images/wael-hneini-QJKEa9n3yN8-unsplash.jpg",
    title: "Dubai",
    description: "Where desert meets luxury in a futuristic skyline.",
    tags: ["dubai", "cityscape", "modern"],
  },
  {
    id: 3,
    url: "/images/martijn-vonk-FTxTyNog7BY-unsplash.jpg",
    title: "Himalayas",
    description: "Snow-capped peaks that touch the sky and steal your breath.",
    tags: ["himalaya", "mountains", "snow"],
  },
  {
    id: 4,
    url: "/images/nvr-endng-anupam-EUwzrxkJAAY-unsplash.jpg",
    title: "Meghalaya",
    description: "Lush green landscapes and hidden waterfalls await.",
    tags: ["meghalaya", "northeast", "waterfalls"],
  },
  {
    id: 5,
    url: "/images/abhishek-prasad-ii0oWs5abCo-unsplash.jpg",
    title: "Kerala",
    description: "Calm waters, swaying palms, and peaceful houseboats.",
    tags: ["kerala", "backwaters", "south india"],
  },
  {
    id: 6,
    url: "/images/ibrahim-asad-ZEfzyduAyJU-unsplash.jpg",
    title: "Goa",
    description: "Sun, sand, and serenity along India’s vibrant west coast.",
    tags: ["goa", "beach", "sunset"],
  },
  {
    id: 7,
    url: "/images/giuliano-gabella-D93E_uNgaL8-unsplash.jpg",
    title: "Rajasthan",
    description: "Golden dunes and colorful culture meet in the royal desert.",
    tags: ["rajasthan", "desert", "india"],
  },
  {
    id: 8,
    url: "/images/axp-photography-3jipkzDIug4-unsplash.jpg",
    title: "Greece",
    description: "White houses and deep blue seas make the perfect postcard.",
    tags: ["greece", "europe", "santorini"],
  },
  {
    id: 9,
    url: "/images/piotr-guzik-y1eYP8RLTu4-unsplash.jpg",
    title: "Swiss Alps",
    description: "Majestic snow-covered mountains and alpine beauty.",
    tags: ["switzerland", "alps", "europe"],
  },
  {
    id: 10,
    url: "/images/praneet-kumar-H8dcf-v98mA-unsplash.jpg",
    title: "Kashmir Valley",
    description: "Heaven on earth with meadows, rivers, and mountains.",
    tags: ["kashmir", "north india", "valley"],
  },
  {
    id: 11,
    url: "/images/jil-beckmann-FbnKYFCoFew-unsplash.jpg",
    title: "New Zealand",
    description: "Mirror-like lakes reflecting nature’s masterpiece.",
    tags: ["new zealand", "lakes", "nature"],
  },
  {
    id: 12,
    url: "/images/gigin-krishnan-qHj0sGMZJF0-unsplash.jpg",
    title: "Munnar",
    description: "Rolling tea plantations in Kerala's cool green hills.",
    tags: ["munnar", "kerala", "hill station"],
  },
];

function ImageAccordion() {
  const router = useRouter();
  return (
    <>
      <div className="group flex max-md:flex-col justify-center gap-2 w-full px-12 pt-12 pb-6">
        {items.map((item) => {
          return (
            <article
              onClick={() => {
                router.push(`/packages?search=${item.title}`);
              }}
              key={item.id}
              className="group/article relative w-full rounded-xl overflow-hidden md:group-hover:[&:not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur after:rounded-lg after:transition-all focus-within:ring focus-within:ring-indigo-300"
            >
              <a
                className="absolute inset-0 text-white z-10  p-3 flex flex-col justify-end"
                href="#0"
              >
                <h1 className=" text-xl font-medium   md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300">
                  {item?.title}
                </h1>
                <span className=" text-sm font-medium  md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-500 group-focus-within/article:delay-500">
                  {item?.description}
                </span>
              </a>
              <Image
                className="object-cover h-72 md:h-[420px] w-full"
                src={item?.url}
                width="960"
                height="480"
                alt="Image 01"
              />
            </article>
          );
        })}
      </div>
    </>
  );
}

export default ImageAccordion;
