import React from "react";

const YouTubeShort: React.FC<{ videoId: string, size: "large" | "medium" | "small" }> = ({ videoId, size }) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden group relative border-0 bg-gray-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
        size === "large"
          ? "col-span-1 row-span-1 md:row-span-3 md:col-span-2 lg:col-span-3 xl:col-span-3"
          : size === "medium"
          ? "col-span-1 row-span-1 md:row-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2"
          : "col-span-1 row-span-1 md:row-span-2"
      }`}
    >
      <div className="relative w-full h-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Short"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeShort;
