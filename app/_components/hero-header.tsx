"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleWhatsAppClick = () => {
    const phoneNumber = "+916282948617";
    const message = "Hi! I'm interested in your travel services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    {
      name: "International Tours",
      href: "/international-tours",
      active: pathname === "/international-tours",
    },
    {
      name: "Domestic Tours",
      href: "/domestic-tours",
      active: pathname === "/domestic-tours",
    },
    {
      name: "Kerala Tours",
      href: "/kerala-tours",
      active: pathname === "/kerala-tours",
    },
    {
      name: "Customized",
      href: "/customized-tours",
      active: pathname === "/customized-tours",
    },
    {
      name: "Other Services",
      href: "/services",
      active: pathname === "/services",
    },
  ];

  return (
    <header className="fixed top-0 right-0 z-40 h-screen pointer-events-none">
      {/* Non-Standard Header - Vertical Right Side Layout */}
      {/* Desktop Header - Vertical Right Side */}
      <div className="hidden lg:flex flex-col h-full justify-start items-end pt-8 pr-8 space-y-8 pointer-events-auto">
        {/* Logo positioned at top-right with padding */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-end space-y-4"
        >
          <Link
            href="/"
            className="flex items-center space-x-3 group bg-black/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-black/30 transition-all duration-300"
            aria-label="Return to Yathrananda homepage"
          >
            <span className="text-white font-bold text-xl hidden xl:block">
              Yathrananda
            </span>
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="Yathrananda Logo"
              width={60}
              height={60}
              className="w-12 h-12 object-cover rounded-full ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300"
              loading="eager"
              priority
            />
          </Link>

          {/* WhatsApp Contact - Positioned below logo */}
          <motion.button
            className="flex items-center space-x-3 bg-green-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:bg-green-700/90 shadow-lg hover:shadow-xl group"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppClick}
            aria-label="Contact Yathrananda on WhatsApp"
          >
            <span className="hidden xl:inline">+91 98765 43210</span>
            <span className="xl:hidden">Call Us</span>
            <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Vertical Navigation - Elegantly spaced */}
        <motion.nav
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-end space-y-6 bg-black/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          role="navigation"
          aria-label="Main navigation"
        >
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 ease-out relative group text-right block hover:translate-x-[-8px] ${
                  item.active
                    ? "text-white font-semibold scale-110"
                    : "text-white/80 hover:text-white hover:scale-105"
                }`}
                aria-label={`Navigate to ${item.name}`}
                aria-current={item.active ? "page" : undefined}
              >
                <span className="relative inline-block">
                  {item.name}
                  <span
                    className={`absolute -bottom-1 right-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                      item.active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                  {/* Decorative dot for active state */}
                  {item.active && (
                    <motion.span
                      className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </div>

      {/* Mobile Header - Conventional Top Layout */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm pointer-events-auto">
        <nav
          className="max-w-7xl mx-auto px-4 py-4"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              aria-label="Return to Yathrananda homepage"
            >
              <Image
                src="/placeholder.svg?height=60&width=60"
                alt="Yathrananda Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-cover rounded-full ring-2 ring-white/20"
                loading="eager"
                priority
              />
              <span className="text-white font-bold text-lg">Yathrananda</span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-full font-medium text-xs transition-all duration-200 hover:bg-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                aria-label="Contact Yathrananda on WhatsApp"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </motion.button>

              <button
                className="p-2 text-white hover:text-white/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden"
              >
                <div className="px-4 py-2 space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block py-3 px-2 text-sm font-medium transition-all duration-200 rounded-md ${
                        item.active
                          ? "text-white bg-white/10 font-semibold"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label={`Navigate to ${item.name}`}
                      aria-current={item.active ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}

export default Header;
