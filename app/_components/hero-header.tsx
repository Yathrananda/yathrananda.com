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
    const phoneNumber = "+917593873555";
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
    // {
    //   name: "Other Services",
    //   href: "/services",
    //   active: pathname === "/services",
    // },
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


// export const SectionTwo = () => {
//   return (
//     <section
//       id="home"
//       className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
//       aria-labelledby="hero-heading"
//     >
//       {/* Dynamic Background with Overlay */}
//       <div className="absolute inset-0">
//         <div className="w-full h-full relative">
//           {/* Background Images/Videos */}
//           <div className="absolute inset-0 z-0">
//             {isLoading ? (
//               <img
//                 src="/images/hero-background-4.jpg?height=1080&width=1920"
//                 alt="Travel adventure background"
//                 className="w-full h-full object-cover"
//                 draggable="false"
//               />
//             ) : (
//               <AnimatePresence>
//                 {heroContent.map(
//                   (content, index) =>
//                     index === currentImageIndex && (
//                       <motion.div
//                         key={`${index}-${content.url}`}
//                         initial={{ opacity: 0, scale: 1.1 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.95 }}
//                         transition={{ duration: 1, ease: "easeInOut" }}
//                         className="absolute inset-0"
//                       >
//                         {content.type === "video" ? (
//                           <video
//                             src={content.url}
//                             autoPlay
//                             muted
//                             loop
//                             playsInline
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <img
//                             src={content.url || "/images/hero-background-4.jpg?height=1080&width=1920"}
//                             alt="Travel adventure background"
//                             className="w-full h-full object-cover"
//                             draggable="false"
//                           />
//                         )}
//                       </motion.div>
//                     ),
//                 )}
//               </AnimatePresence>
//             )}
//           </div>

//           {/* Modern Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10" />
//         </div>
//       </div>

//       {/* Geometric Background Elements */}
//       <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.2, 0.4, 0.2],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//             delay: 2,
//           }}
//         />
//         <motion.div
//           className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl"
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.2, 0.3, 0.2],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//             delay: 1,
//           }}
//         />
//       </div>

//       {/* Header */}
//       <header className="relative z-40 w-full">
//         <div className="flex items-center justify-between px-6 lg:px-12 py-6">
//           {/* Logo */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <Link
//               href="/"
//               className="block group transition-all duration-300"
//               aria-label="Return to Yathrananda homepage"
//             >
//               <Image
//                 src="/images/logo.png"
//                 alt="Yathrananda - A Travel Fusion"
//                 width={280}
//                 height={80}
//                 className="h-10 lg:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
//                 loading="eager"
//                 priority
//               />
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <motion.nav
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
//             className="hidden lg:flex items-center space-x-8 bg-white/10 backdrop-blur-md rounded-full px-8 py-3 border border-white/20"
//             role="navigation"
//             aria-label="Main navigation"
//           >
//             {navigationItems.map((item, index) => (
//               <motion.div
//                 key={item.name}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.1 * index }}
//               >
//                 <Link
//                   href={item.href}
//                   className={`relative text-sm font-medium transition-all duration-300 ease-out group py-2 px-3 rounded-full ${
//                     item.active
//                       ? "text-white bg-white/20 font-semibold"
//                       : "text-white/90 hover:text-white hover:bg-white/10"
//                   }`}
//                   aria-label={`Navigate to ${item.name}`}
//                   aria-current={item.active ? "page" : undefined}
//                 >
//                   {item.name}
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4">
//             {/* WhatsApp Button - Desktop */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="hidden lg:block"
//             >
//               <motion.button
//                 className="flex items-center space-x-2 bg-green-600/90 backdrop-blur-sm text-white px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:bg-green-700/90 shadow-lg hover:shadow-xl group border border-green-500/30"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleWhatsAppClick}
//                 aria-label="Contact Yathrananda on WhatsApp"
//               >
//                 <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
//                 <span>+91 62829 48617</span>
//               </motion.button>
//             </motion.div>

//             {/* Mobile Actions */}
//             <div className="lg:hidden flex items-center space-x-3">
//               <motion.button
//                 className="flex items-center justify-center bg-green-600/90 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:bg-green-700/90 shadow-lg border border-green-500/30"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleWhatsAppClick}
//                 aria-label="Contact Yathrananda on WhatsApp"
//               >
//                 <MessageCircle className="w-5 h-5" />
//               </motion.button>

//               <motion.button
//                 className="flex items-center justify-center p-3 text-white bg-white/15 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-white/20 shadow-lg border border-white/20"
//                 onClick={toggleMobileMenu}
//                 aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
//                 aria-expanded={isMobileMenuOpen}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <AnimatePresence mode="wait">
//                   {isMobileMenuOpen ? (
//                     <motion.div
//                       key="close"
//                       initial={{ rotate: -90, opacity: 0 }}
//                       animate={{ rotate: 0, opacity: 1 }}
//                       exit={{ rotate: 90, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <X className="w-5 h-5" />
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key="menu"
//                       initial={{ rotate: 90, opacity: 0 }}
//                       animate={{ rotate: 0, opacity: 1 }}
//                       exit={{ rotate: -90, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <Menu className="w-5 h-5" />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Navigation Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             <motion.div
//               className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               onClick={closeMobileMenu}
//             />

//             <motion.div
//               className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black/95 backdrop-blur-md z-50 shadow-2xl border-l border-white/10"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             >
//               <div className="flex flex-col h-full">
//                 <div className="flex items-center justify-between p-6 border-b border-white/10">
//                   <Image
//                     src="/images/logo.png"
//                     alt="Yathrananda"
//                     width={120}
//                     height={34}
//                     className="h-8 w-auto object-contain"
//                   />
//                   <button
//                     onClick={closeMobileMenu}
//                     className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
//                     aria-label="Close navigation menu"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 <nav className="flex-1 px-6 py-8" role="navigation" aria-label="Mobile navigation">
//                   <div className="space-y-2">
//                     {navigationItems.map((item, index) => (
//                       <motion.div
//                         key={item.name}
//                         initial={{ opacity: 0, x: 50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.1 }}
//                       >
//                         <Link
//                           href={item.href}
//                           className={`block py-4 px-4 text-lg font-medium transition-all duration-200 rounded-xl ${
//                             item.active
//                               ? "text-white bg-primary/20 font-semibold border-l-4 border-primary shadow-sm"
//                               : "text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-2"
//                           }`}
//                           onClick={closeMobileMenu}
//                           aria-label={`Navigate to ${item.name}`}
//                           aria-current={item.active ? "page" : undefined}
//                         >
//                           {item.name}
//                         </Link>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </nav>

//                 <div className="p-6 border-t border-white/10">
//                   <motion.button
//                     className="w-full flex items-center justify-center space-x-3 bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-green-700 shadow-lg border border-green-500/30"
//                     onClick={() => {
//                       handleWhatsAppClick()
//                       closeMobileMenu()
//                     }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     aria-label="Contact Yathrananda on WhatsApp"
//                   >
//                     <MessageCircle className="w-5 h-5" />
//                     <span>+91 62829 48617</span>
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Main Hero Content */}
//       <div className="relative z-30 flex items-center justify-center min-h-[calc(100vh-120px)] px-6 lg:px-12">
//         <div className="max-w-7xl mx-auto w-full">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               className="space-y-8"
//             >
//               {/* Main Headline */}
//               <div className="space-y-4">
//                 <motion.h1
//                   id="hero-heading"
//                   className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1, delay: 0.2 }}
//                 >
//                   <motion.span
//                     className="block"
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: 0.4 }}
//                   >
//                     Explore The World
//                   </motion.span>
//                   <motion.span
//                     className="block text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text"
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: 0.6 }}
//                   >
//                     With Confidence
//                   </motion.span>
//                 </motion.h1>

//                 <motion.p
//                   className="text-white/90 text-lg lg:text-xl font-light max-w-2xl leading-relaxed"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1, delay: 0.8 }}
//                 >
//                   From the Backwaters of Kerala to Every Corner of the Globe
//                 </motion.p>
//               </div>

//               {/* Enhanced Search Bar */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1, delay: 1 }}
//                 className="max-w-2xl"
//               >
//                 <div className="relative group">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
//                   <div className="relative flex flex-col sm:flex-row bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
//                     <div className="flex-1 flex items-center px-6 py-4">
//                       <Search className="w-5 h-5 text-gray-500 mr-4 flex-shrink-0" />
//                       <input
//                         type="text"
//                         placeholder="Where do you want to go?"
//                         className="flex-1 text-base text-gray-900 bg-transparent outline-none placeholder:text-gray-500 font-medium"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") {
//                             router.push(`/packages?search=${searchQuery}`)
//                           }
//                         }}
//                       />
//                     </div>
//                     <motion.button
//                       type="button"
//                       onClick={() => {
//                         router.push(`/packages?search=${searchQuery}`)
//                       }}
//                       className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 font-semibold text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg relative overflow-hidden"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <span className="relative z-10">Let's Go</span>
//                       <motion.div
//                         className="absolute inset-0 bg-white/10"
//                         initial={{ x: "-100%" }}
//                         whileHover={{ x: "100%" }}
//                         transition={{ duration: 0.6 }}
//                       />
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Right Content - Glassmorphism Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
//               className="hidden lg:block"
//             >
//               <div className="relative">
//                 <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-xl"></div>
//                 <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
//                   <div className="space-y-6">
//                     <h3 className="text-white text-2xl font-semibold">Why Choose Us?</h3>
//                     <div className="space-y-4">
//                       {["Expert Local Guides", "Customized Itineraries", "24/7 Support", "Best Price Guarantee"].map(
//                         (feature, index) => (
//                           <motion.div
//                             key={feature}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
//                             className="flex items-center space-x-3 text-white/90"
//                           >
//                             <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></div>
//                             <span className="text-sm font-medium">{feature}</span>
//                           </motion.div>
//                         ),
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Elements */}
//       <div className="absolute bottom-0 left-0 right-0 z-30">
//         <div className="flex items-end justify-between px-6 lg:px-12 pb-8">
//           {/* Scroll Indicator - Left */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 1.4 }}
//             className="hidden lg:flex flex-col items-center space-y-3"
//           >
//             <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center hover:border-white/60 transition-colors">
//               <motion.div
//                 className="w-0.5 h-2 bg-white/60 rounded-full mt-1.5"
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Number.POSITIVE_INFINITY,
//                   ease: "easeInOut",
//                 }}
//               />
//             </div>
//             <span className="text-white/60 text-xs font-medium">Scroll to explore</span>
//           </motion.div>

//           {/* Carousel Indicators - Right */}
//           {!isLoading && heroContent.length > 1 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 1.6 }}
//               className="flex flex-col items-center space-y-3"
//             >
//               <span className="text-white/60 text-xs font-medium">Gallery</span>
//               <div className="flex flex-col space-y-3 bg-white/10 backdrop-blur-sm rounded-full px-3 py-4 border border-white/20">
//                 {heroContent.map((_, index) => (
//                   <motion.button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`w-2 h-6 rounded-full transition-all duration-500 ${
//                       currentImageIndex === index ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/60"
//                     }`}
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                     aria-label={`Go to slide ${index + 1}`}
//                     aria-current={currentImageIndex === index}
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </section>

//   )
// }
