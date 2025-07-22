import React from "react";
import YouTubeShort from "./youtube-short";

const YouTubeShortsBentoGrid: React.FC = () => {
  const shorts = [
    {
      videoId: "PTysogWtEtk",
      size: "large",
    },
    {
      videoId: "jYVvKQtNUsE",
      size: "medium",
    },
    {
      videoId: "HwlCMbj227o",
      size: "medium",
    },
    {
      videoId: "AQBZCExKxSI",
      size: "small",
    },
    {
      videoId: "RM9pJ8QhN1I",
      size: "small",
    },
    {
      videoId: "RTSMF5R8GmE",
      size: "small",
    },
    {
      videoId: "JosrSfnpMn8",
      size: "medium",
    },
    {
      videoId: "VdmBT3vkLlg",
      size: "small",
    },
    {
      videoId: "Lxgbj9KrVZI",
      size: "small",
    },
    {
      videoId: "KGLFBWVmJL8",
      size: "medium",
    },
  ];

  return (
    <div className="relative h-[800px] overflow-hidden">
      <div className="px-2 md:px-12 py-6">
        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {shorts.map((short, index) => (
            <YouTubeShort
              key={`${short.videoId}-${index}`}
              videoId={short.videoId}
              size={short.size as "large" | "medium" | "small"}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white"></div>
    </div>
  );
};

export default YouTubeShortsBentoGrid;
