"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => pathname === href;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: "Home", href: "/", active: isActive("/") },
    { name: "International Tours", href: "/international-tours", active: isActive("/international-tours") },
    { name: "Domestic Tours", href: "/domestic-tours", active: isActive("/domestic-tours") },
    { name: "About Us", href: "/about", active: isActive("/about") },
    { name: "Other Services", href: "/services", active: isActive("/services") },
  ];  

  return (
    <header className="absolute w-full">
      {/* Header Content */}
      <div className="relative z-50 px-4 sm:px-6 py-4 sm:py-6">
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={"/images/logo.png"}
              alt="Yathrananda Logo"
              width={40}
              height={40}
              className="w-40 object-cover rounded-full"
              loading="eager"
              priority
            />
          </motion.div>

          <motion.div
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <div className="bg-background/20 backdrop-blur-sm rounded-full px-8 py-3 border border-background/30">
              <div className="flex items-center space-x-8">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-primary-foreground font-medium transition-all duration-200 ease-out text-sm xl:text-base relative group"
                    whileHover={{ y: -2 }}
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-foreground transition-all duration-200 ease-out group-hover:w-full"
                      aria-hidden="true"
                    ></span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-2 sm:space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            {/* <motion.button
              className="hidden sm:flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:text-gray-900 rounded-full px-4 py-2 font-medium transition-all duration-200 ease-out text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact via phone"
            >
              <Phone className="w-4 h-4" />
              <span>+1 234 567 890</span>
            </motion.button> */}
            <motion.button
              className="hidden sm:flex bg-background/20 text-background backdrop-blur-sm rounded-full px-8 py-3 border border-background/30 font-medium text-sm transition-all duration-200 ease-out items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Make an enquiry"
              onClick={() => router.push("/contact")}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </motion.button>
            <button
              className="lg:hidden text-card-foreground p-2 transition-all duration-200 ease-out hover:bg-background/20 hover:text-background border border-background/30 rounded-lg bg-white/90 backdrop-blur-sm"
              onClick={toggleMobileMenu}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </motion.div>
        </nav>

        {/* Mobile Navigation Menu */}
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl mt-4 mx-4 shadow-xl border border-gray-200"
          aria-hidden={!isMobileMenuOpen}
        >
          <motion.nav
            className="py-4"
            variants={staggerContainer}
            initial="hidden"
            animate={isMobileMenuOpen ? "visible" : "hidden"}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navigationItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 ease-out rounded-lg mx-2"
                variants={fadeInUp}
                whileHover={{ x: 10 }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div
              className="px-6 py-3 border-t border-gray-200 mt-2"
              variants={fadeInUp}
            >
              <div className="flex flex-col space-y-3">
                <button
                  className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 rounded-full font-medium transition-all duration-200 ease-out flex items-center justify-center space-x-2"
                  aria-label="Contact via phone"
                  onClick={() => window.location.href = "tel:+1234567890"}
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 234 567 890</span>
                </button>
                <button
                  className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-full font-medium transition-all duration-200 ease-out flex items-center justify-center space-x-2"
                  aria-label="Make an enquiry"
                  onClick={() => router.push("/contact")}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Us</span>
                </button>
              </div>
            </motion.div>
          </motion.nav>
        </motion.div>
      </div>
    </header>
  );
}
