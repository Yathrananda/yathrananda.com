"use client";

import type React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Header from "../_components/header";
import SimpleFooter from "../_components/simple-footer";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function ContactPage() {
  const locations = [
    {
      name: "Kozhikode Office",
      contact: "+91 7593873501",
      address: "Merry Land Square, V Panoli Road, Thiruthiyad, Kozhikode, Kerala 673004",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0149679186184!2d75.78641078374645!3d11.26030892152943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xae36d8118c378243%3A0xcbfdd3d81c10b28e!2sYathrananda!5e0!3m2!1sen!2sin!4v1752559148939!5m2!1sen!2sin"
    },
    {
      name: "Thalassery Office",
      contact: "+91 7593873503",
      address: "First Floor, City Centre, Opposite Co-op Hospital, Thalassery, Kannur, Kerala 670101",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15624.301913646712!2d75.48976529823007!3d11.759733504320906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sYathrananda%2C%20First%20Floor%2C%20City%20Centre%2C%20Opposite%20Co-op%20Hospital%2C%20Thalassery%2C%20Kannur%2C%C2%A0Kerala%C2%A0670101!5e0!3m2!1sen!2sin!4v1752559328220!5m2!1sen!2sin"
    },
    {
      name: "Thiruvananthapuram Office",
      contact: "+91 7593873502",
      address: "Thottaykadu Building, MG Radhakrishnan Rd, near Kerala Cricket Association, Paund Colony, Vazhuthacaud, Thiruvananthapuram, Kerala 695014",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.054433444134!2d76.95061529678955!3d8.49408870000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb2ffae43273%3A0xb43b5957733cedf8!2sYathrananda%20A%20Travel%20Fusion!5e0!3m2!1sen!2sin!4v1752559234078!5m2!1sen!2sin"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 transition-all duration-200"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Header />

      <main id="main-content">
        {/* Page Header */}
        <section className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Contact Us
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            >
              Get in touch with our travel experts. We're here to help you plan your perfect journey.
            </motion.p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="pb-6 sm:pb-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center shadow-lg flex-1 max-w-xs"
                variants={scaleIn}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">
                  Phone
                </h3>
                <p className="text-primary font-semibold text-base">
                  +91 7593873555 
                </p>
              </motion.div>

              <motion.div
                className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center shadow-lg flex-1 max-w-xs"
                variants={scaleIn}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">
                  Email
                </h3>
                <p className="text-primary font-semibold text-base">
                  support@yathrananda.com
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 bg-muted">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Our Office Locations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visit us at any of our convenient locations across Kerala.
              </p>
            </motion.div>

            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
                  variants={fadeInUp}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-card-foreground">
                          {location.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {location.address}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Contact: {location.contact}
                      </p>
                    </div>
                    <div className="h-48 lg:h-full">
                      <iframe
                        src={location.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map showing ${location.name}`}
                        className="min-h-[192px] lg:min-h-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <SimpleFooter />
    </div>
  );
}
