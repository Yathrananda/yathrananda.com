"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-background border-b border-border sticky top-0 z-40 backdrop-blur-sm">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            aria-label="Return to Yathrananda homepage"
          >
            <Image
              src={"/images/logo.png"}
              alt="Yathrananda Logo"
              width={40}
              height={40}
              className="w-32 object-cover rounded-full"
              loading="eager"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {[
             { name: "Home", href: "/" },
             {
               name: "International",
               href: "/international-tours",
               active: pathname === "/international-tours",
             },
             {
               name: "Domestic",
               href: "/domestic-tours",
               active: pathname === "/domestic-tours",
             },
             {
               name: "Kerala",
               href: "/kerala-tours",
               active: pathname === "/kerala-tours",
             },
             {
               name: "Customized",
               href: "/customised-tours",
               active: pathname === "/customised-tours",
             },
             {
               name: "Contact Us",
               href: "/contact",
               active: pathname === "/contact",
             }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm transition-all duration-200 ease-out relative group ${
                  item.active
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={`Navigate to ${item.name}`}
                aria-current={item.active ? "page" : undefined}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-200 ease-out ${
                    item.active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          <motion.button
            className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ease-out hover:bg-primary-hover shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get started with Yathrananda"
            onClick={() => window.location.href = "https://wa.me/6282948617"}
          >
            Whatsapp Us
          </motion.button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
