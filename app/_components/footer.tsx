import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/p/Yathrananda-100088112573328",
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

const locations = [
  {
    name: "Kozhikode Office",
    contact: "+91 7593873501",
    address:
      "Merry Land Square, V Panoli Road, Thiruthiyad, Kozhikode, Kerala 673004",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0149679186184!2d75.78641078374645!3d11.26030892152943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xae36d8118c378243%3A0xcbfdd3d81c10b28e!2sYathrananda!5e0!3m2!1sen!2sin!4v1752559148939!5m2!1sen!2sin",
  },
  {
    name: "Thalassery Office",
    contact: "+91 7593873503",
    address:
      "First Floor, City Centre, Opposite Co-op Hospital, Thalassery, Kannur, Kerala 670101",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15624.301913646712!2d75.48976529823007!3d11.759733504320906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sYathrananda%2C%20First%20Floor%2C%20City%20Centre%2C%20Opposite%20Co-op%20Hospital%2C%20Thalassery%2C%20Kannur%2C%C2%A0Kerala%C2%A0670101!5e0!3m2!1sen!2sin!4v1752559328220!5m2!1sen!2sin",
  },
  {
    name: "Thiruvananthapuram Office",
    contact: "+91 7593873502",
    address:
      "Thottaykadu Building, MG Radhakrishnan Rd, near Kerala Cricket Association, Paund Colony, Vazhuthacaud, Thiruvananthapuram, Kerala 695014",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.054433444134!2d76.95061529678955!3d8.49408870000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb2ffae43273%3A0xb43b5957733cedf8!2sYathrananda%20A%20Travel%20Fusion!5e0!3m2!1sen!2sin!4v1752559234078!5m2!1sen!2sin",
  },
];

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

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary via-primary-hover to-primary text-white z-10 relative">
      {/* Footer Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="space-y-6">
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
                      href="tel:+917593873555"
                      className="text-background font-semibold hover:text-muted transition-colors duration-300"
                    >
                      +91 7593873555
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

        {/* Office Locations */}
        <div className="py-8 lg:py-12 border-t border-muted">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-background mb-3">
              Our Office Locations
            </h3>
            <p className="text-muted text-sm max-w-2xl mx-auto">
              Visit us at any of our convenient locations across Kerala.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {locations.map((location, index) => (
              <motion.div
                key={index}
                className="bg-primary/20 border border-primary/30 rounded-xl overflow-hidden shadow-lg"
                variants={fadeInUp}
              >
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <MapPin
                        className="w-5 h-5 text-background"
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-background">
                      {location.name}
                    </h4>
                  </div>
                  <p className="text-background/90 text-sm leading-relaxed mb-3">
                    {location.address}
                    {index < 2 ? (
                      <span className="text-background/90 text-sm leading-relaxed mb-3">
                        <br />
                        <a
                          href={`tel:${location.contact}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Contact: {location.contact}
                        </a>
                      </span>
                    ) : (
                      <span className="text-background/90 text-sm leading-relaxed mb-3">
                        <a
                          href={`tel:${location.contact}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          , Contact: {location.contact}
                        </a>
                      </span>
                    )}
                  </p>
                </div>
                <div className="h-32">
                  <iframe
                    src={location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing ${location.name}`}
                    className="min-h-[128px]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
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
