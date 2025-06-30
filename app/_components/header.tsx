import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function Header() {
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
            aria-label="Return to MALVORA homepage"
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
              { name: "About Us", href: "/about", active: true },
              { name: "Services", href: "#services" },
              { name: "Pricing", href: "#pricing" },
              { name: "Contact Us", href: "#contact" },
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
            aria-label="Get started with MALVORA"
          >
            Get Started
          </motion.button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
