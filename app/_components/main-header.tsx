"use client";
import { Link, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function MainHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigationItems = [
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
    },
  ];
  const handleWhatsAppClick = () => {
    const phoneNumber = "+917593873555";
    const message = "Hi! I'm interested in your travel services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background">
        <div className="relative bg-primary text-sm font-medium text-background block">
          <div className="flex items-center justify-between px-4 sm:px-8 lg:px-[84px] py-2">
            <div className="flex items-center space-x-4">
              <Link
                href="tel:917593873555"
                className="flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>+917593873555</span>
              </Link>
              <Link
                href="tel:917593873999"
                className="items-center space-x-2 hidden md:flex"
              >
                <Phone className="w-4 h-4" />
                <span>+917593873999</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="mailto:support@yathrananda.com"
                className="flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>support@yathrananda.com</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-between px-4 sm:px-8 lg:px-20 py-2">
          <div>
            <Link
              href="/"
              className="block group transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
              aria-label="Return to Yathrananda homepage"
            >
              <Image
                src="/images/logo.png"
                alt="Yathrananda - A Travel Fusion"
                width={280}
                height={80}
                className="h-12 lg:h-16 pr-4 w-auto object-contain transition-all duration-500"
                loading="eager"
                priority
              />
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div
            className="hidden lg:flex items-center space-x-1 rounded-full px-2 py-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigationItems.map((item, index) => (
              <div key={`id${index}`}>
                <Link
                  href={item.href}
                  className={`relative text-sm font-semibold transition-all duration-300 ease-out group py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-lg ${
                    item.active
                      ? "text-foreground bg-white/30 shadow-xl"
                      : "text-foreground/95 hover:text-foreground hover:bg-white/20"
                  }`}
                  aria-label={`Navigate to ${item.name}`}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span className="relative z-10">{item.name}</span>
                  {item.active && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Enhanced Right Side Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:block">
              <motion.button
                className="relative flex items-center space-x-3 bg-primary text-white px-6 py-3 font-semibold text-sm transition-all duration-300 hover:bg-primary-hover rounded-sm"
                onClick={handleWhatsAppClick}
                aria-label="Contact Yathrananda on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="xl:inline">WhatsApp Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </div>

            {/* Enhanced Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-3">
              <motion.button
                className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-hover text-white p-3 rounded-sm transition-all duration-200 hover:from-primary-hover hover:to-primary-hover border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                aria-label="Contact Yathrananda on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="flex items-center justify-center p-3 text-primary-hover bg-background backdrop-blur-lg rounded-sm transition-all duration-200 hover:bg-white/35 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={toggleMobileMenu}
                aria-label={
                  isMobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMobileMenuOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-white/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white/70 backdrop-blur-xl z-50 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6">
                  <Image
                    src="/images/logo.png"
                    alt="Yathrananda"
                    width={120}
                    height={34}
                    className="h-12 w-auto object-contain"
                  />
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 text-primary hover:text-primary-hover transition-colors rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav
                  className="flex-1 px-6 py-8"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  <div className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={`block py-4 px-4 text-lg font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            item.active
                              ? "text-primary bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-400 shadow-lg"
                              : "text-primary/90 hover:text-primary hover:bg-primary/10 hover:translate-x-2"
                          }`}
                          onClick={closeMobileMenu}
                          aria-label={`Navigate to ${item.name}`}
                          aria-current={item.active ? "page" : undefined}
                        >
                          <span className="flex items-center justify-between">
                            {item.name}
                            {item.active && (
                              <motion.div
                                className="w-2 h-2 bg-blue-400 rounded-full shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <div className="p-6">
                  <motion.button
                    className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-primary to-primary-hover text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:from-primary-hover hover:to-primary-hover"
                    onClick={() => {
                      handleWhatsAppClick();
                      closeMobileMenu();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Contact Yathrananda on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>+91 75938 73555</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
