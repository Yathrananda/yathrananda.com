import ScrollBaseAnimation from "@/components/ui-layouts/text-marquee";
import React from "react";

const PureMarquee: React.FC = () => {
  return (
    <div className="grid place-content-center">
      <ScrollBaseAnimation
        delay={500}
        baseVelocity={-1}
        clasname="font-semibold tracking-[-0.07em] leading-[90%]"
      >
        Go see some new places and make good memories. Let&apos;s travel with
        nature and enjoy it fully.
      </ScrollBaseAnimation>
      <ScrollBaseAnimation
        delay={500}
        baseVelocity={1}
        clasname="font-semibold tracking-[-0.07em] leading-[90%]"
      >
        A small trip is enough to feel fresh. It&apos;s always better when
        nature comes with us.
      </ScrollBaseAnimation>
    </div>
  );
};

export default PureMarquee;
