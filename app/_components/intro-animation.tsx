"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const IntroAnimation = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [animationPhase, setAnimationPhase] = useState("intro");

  useEffect(() => {
    // Start reveal animation after intro
    const revealTimer = setTimeout(() => {
      setAnimationPhase("reveal");
    }, 1500);

    // Start fade out after reveal
    const fadeTimer = setTimeout(() => {
      setAnimationPhase("fadeOut");
    }, 3000);

    // Remove overlay completely
    const removeTimer = setTimeout(() => {
      setShowOverlay(false);
    }, 4000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [animationPhase]);

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary-hover to-primary flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{
          opacity: animationPhase === "fadeOut" ? 0 : 1,
        }}
        transition={{
          duration: animationPhase === "fadeOut" ? 1 : 0,
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-col items-center justify-center relative z-10">
          <Image
            src="/title.png"
            alt="Yathrananda"
            width={280}
            height={80}
            className="h-52 md:h-72 w-auto object-contain brightness-0 invert mb-44"
            priority
          />
          {/* Lottie Animation in Gif */}
          <div className="w-36 h-36 lg:w-80 lg:h-80 absolute top-[35%] md:top-[38%] left-1/2 -translate-x-1/2">
            <Image src="/loading-animation.gif" alt="Loading" width={300} height={300} className="opacity-95" />
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-white origin-bottom"
        initial={{
          clipPath: "ellipse(0% 0% at 50% 100%)",
        }}
        animate={{
          clipPath:
            animationPhase === "reveal" || animationPhase === "fadeOut"
              ? "ellipse(150% 150% at 50% 100%)"
              : "ellipse(0% 0% at 50% 100%)",
        }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />

      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{
          opacity: animationPhase === "fadeOut" ? 1 : 0,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: animationPhase === "fadeOut" ? 0.5 : 0,
        }}
      />
    </div>
  );
};

export default IntroAnimation;
