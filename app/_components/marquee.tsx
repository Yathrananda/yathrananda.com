import React from 'react';

const PureMarquee: React.FC = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-[#f5f5f5] py-4">
      <div className="inline-block animate-marquee">
        <span className="text-4xl font-bold text-transparent stroke-text px-4">
          Discover new horizons and create unforgettable memories. Our innovative travel solutions bring you closer to nature and adventure, ensuring every journey is sustainable and enriching.
        </span>
      </div>
    </div>
  );
};

export default PureMarquee;
