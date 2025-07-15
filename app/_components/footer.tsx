import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/yathrananda",
    icon: Facebook,
    bgColor: "bg-blue-600",
    color: "text-white",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/yathrananda",
    icon: Instagram,
    bgColor: "bg-pink-600",
    color: "text-white",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary via-primary-hover to-primary text-white">
      {/* Footer Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="inline-block">
                  <Image
                    src="/images/logo.png"
                    alt="Yathrananda - A Travel Fusion"
                    width={240}
                    height={68}
                    className="h-12 sm:h-14 w-auto object-contain brightness-0 invert"
                  />
                </Link>
              </motion.div>
              <motion.p
                className="text-muted text-base sm:text-lg leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Your trusted travel companion for unforgettable journeys. From
                Kerala's backwaters to global adventures, we create memories
                that last a lifetime.
              </motion.p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <motion.h3
                className="text-xl font-semibold text-background"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center space-x-3 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-background">Call Us</p>
                    <a
                      href="tel:+919876543210"
                      className="text-background font-semibold hover:text-muted transition-colors duration-300"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-background">Email Us</p>
                    <a
                      href="mailto:support@yathrananda.com"
                      className="text-background font-semibold hover:text-muted transition-colors duration-300"
                    >
                      support@yathrananda.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-3 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300 mt-1">
                    <MapPin className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-background">Visit Us</p>
                    <p className="text-background font-semibold">
                      Kerala, India
                      <br />
                      <span className="text-sm font-normal text-background">
                        God's Own Country
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-6">
              <motion.h3
                className="text-xl font-semibold text-background"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Follow Us
              </motion.h3>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-center w-12 h-12 bg-primary rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.bgColor} backdrop-blur-sm`}
                      aria-label={`Follow us on ${social.name}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <IconComponent
                        className={`w-6 h-6 text-background transition-colors duration-300 ${social.color}`}
                      />
                    </motion.a>
                  );
                })}
              </motion.div>
              <motion.p
                className="text-muted text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                Stay connected for travel inspiration, exclusive deals, and
                destination highlights.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-muted py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-muted text-sm text-center sm:text-left">
                © {currentYear} Yathrananda. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Link
                  href="/privacy"
                  className="text-muted hover:text-background transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/terms"
                  className="text-muted hover:text-background transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
            <motion.div
              className="flex items-center space-x-2 text-sm text-background"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span>Made with</span>
              <motion.span
                className="text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                ❤️
              </motion.span>
              <span>in Kerala</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
