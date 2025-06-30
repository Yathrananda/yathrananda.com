"use client";

import type React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Users,
  Globe,
  Award,
  Heart,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { HTMLAttributes, useEffect, useRef, JSX, useState } from "react";
import Header from "../_components/header";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  as?: keyof JSX.IntrinsicElements;
}

const AnimatedSection = ({
  children,
  className = "",
  variant = fadeInUp,
  as: Component = "section",
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={mounted && isInView ? "visible" : "hidden"}
      variants={variant}
      className={className}
      // @ts-ignore
      // as={Component}
    >
      {children}
    </motion.div>
  );
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      title: "Founder & CEO",
      bio: "With over 15 years in the travel industry, Sarah founded MALVORA to make personalized travel accessible to everyone. Her passion for exploration and cultural exchange drives our mission.",
      image: "/images/team/sarah-johnson.jpg",
      alt: "Sarah Johnson, Founder and CEO of MALVORA Travel Agency",
    },
    {
      name: "Michael Chen",
      title: "Head of Operations",
      bio: "Michael ensures every MALVORA journey runs smoothly. His expertise in logistics and customer service guarantees exceptional travel experiences for our clients.",
      image: "/images/team/michael-chen.jpg",
      alt: "Michael Chen, Head of Operations at MALVORA Travel Agency",
    },
    {
      name: "Emily Rodriguez",
      title: "Travel Experience Designer",
      bio: "Emily crafts unique itineraries that capture the essence of each destination. Her creative approach and local knowledge create unforgettable adventures.",
      image: "/images/team/emily-rodriguez.jpg",
      alt: "Emily Rodriguez, Travel Experience Designer at MALVORA Travel Agency",
    },
    {
      name: "David Thompson",
      title: "Customer Success Manager",
      bio: "David is dedicated to ensuring every client's satisfaction. His 24/7 support and problem-solving skills make him an invaluable part of our team.",
      image: "/images/team/david-thompson.jpg",
      alt: "David Thompson, Customer Success Manager at MALVORA Travel Agency",
    },
    {
      name: "Lisa Park",
      title: "Marketing Director",
      bio: "Lisa connects travelers with their dream destinations through strategic marketing and storytelling. Her digital expertise helps us reach adventure seekers worldwide.",
      image: "/images/team/lisa-park.jpg",
      alt: "Lisa Park, Marketing Director at MALVORA Travel Agency",
    },
    {
      name: "James Wilson",
      title: "Finance & Operations",
      bio: "James manages our financial operations and ensures transparent pricing. His attention to detail and integrity maintain our clients' trust in every transaction.",
      image: "/images/team/james-wilson.jpg",
      alt: "James Wilson, Finance and Operations Manager at MALVORA Travel Agency",
    },
  ];

  const companyValues = [
    {
      icon: Heart,
      title: "Personalized Service",
      description:
        "Every journey is tailored to your unique preferences, interests, and travel style.",
    },
    {
      icon: Globe,
      title: "Global Expertise",
      description:
        "Our extensive network of local partners ensures authentic experiences worldwide.",
    },
    {
      icon: Award,
      title: "Excellence Commitment",
      description:
        "We maintain the highest standards in service quality and customer satisfaction.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "We support local communities and promote sustainable tourism practices.",
    },
  ];

  const achievements = [
    { number: "10,000+", label: "Happy Travelers" },
    { number: "50+", label: "Countries Covered" },
    { number: "15", label: "Years Experience" },
    { number: "4.9/5", label: "Customer Rating" },
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
      <Header />
      <main id="main-content">
        {/* Page Header */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                >
                  <Users className="w-4 h-4" aria-hidden="true" />
                  <span>Meet Our Team</span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  About MALVORA Travel Agency
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We're passionate travel experts dedicated to creating
                  extraordinary journeys that connect you with the world's most
                  incredible destinations. Since 2009, we've been crafting
                  personalized travel experiences that go beyond ordinary
                  tourism.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-lg flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Start planning your journey with MALVORA"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                  <motion.button
                    className="border border-border text-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-muted"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Learn more about our services"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src="/images/about/team-hero.jpg"
                    alt="MALVORA travel team working together to plan amazing journeys"
                    width={600}
                    height={400}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Floating achievement cards */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
                >
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
                >
                  <div className="text-2xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">
                    Customer Rating
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6"
          aria-labelledby="overview-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="overview-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6"
              >
                Our Mission & Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                At MALVORA, we believe travel is more than just visiting
                places—it's about creating meaningful connections, discovering
                new perspectives, and building memories that last a lifetime.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                  Our Story
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2009 by travel enthusiast Sarah Johnson, MALVORA
                    began as a small boutique agency with a simple mission: to
                    make extraordinary travel experiences accessible to
                    everyone. What started as a passion project has grown into a
                    trusted global travel partner.
                  </p>
                  <p>
                    Today, we specialize in creating personalized itineraries
                    that reflect your unique interests, whether you're seeking
                    adventure in remote mountains, cultural immersion in
                    bustling cities, or relaxation on pristine beaches.
                  </p>
                  <p>
                    Our commitment to sustainable tourism and supporting local
                    communities ensures that your travels make a positive impact
                    on the destinations you visit.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src="/images/about/company-story.jpg"
                    alt="MALVORA's journey from a small travel agency to a global travel partner"
                    width={600}
                    height={400}
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>

            {/* Company Values */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center transition-all duration-200 ease-out hover:shadow-lg group"
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 group-hover:bg-primary/20"
                    whileHover={{ scale: 1.1 }}
                  >
                    <value.icon
                      className="w-6 h-6 text-primary"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Achievements Section */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6 bg-muted"
          aria-labelledby="achievements-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="achievements-heading"
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              >
                Our Achievements
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These numbers represent the trust our clients place in us and
                the incredible journeys we've created together.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    {achievement.number}
                  </motion.div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection
          className="py-16 sm:py-20 px-4 sm:px-6"
          aria-labelledby="team-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="team-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6"
              >
                Meet Our Expert Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our passionate team of travel experts brings decades of combined
                experience in creating unforgettable journeys. Each member is
                dedicated to making your travel dreams a reality.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {teamMembers.map((member, index) => (
                <motion.article
                  key={index}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg transition-all duration-200 ease-out group hover:shadow-xl"
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.alt}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {member.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Contact Information */}
        <AnimatedSection
          id="contact"
          className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-primary/5 to-accent/5"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                id="contact-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6"
              >
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ready to start planning your next adventure? Our travel experts
                are here to help you create the perfect itinerary tailored to
                your dreams and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-8">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: "Email Us",
                      content: "hello@malvora.com",
                      description: "Send us your travel inquiries anytime",
                      href: "mailto:hello@malvora.com",
                    },
                    {
                      icon: Phone,
                      title: "Call Us",
                      content: "+1 (555) 123-4567",
                      description: "Speak with our travel experts",
                      href: "tel:+15551234567",
                    },
                    {
                      icon: MapPin,
                      title: "Visit Us",
                      content: "123 Travel Street, Adventure City, AC 12345",
                      description: "Schedule an in-person consultation",
                      href: "https://maps.google.com",
                    },
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-200 ease-out hover:bg-card hover:shadow-md group"
                      whileHover={{ x: 5 }}
                      aria-label={`${contact.title}: ${contact.content}`}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-primary/20">
                        <contact.icon
                          className="w-6 h-6 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {contact.title}
                        </h4>
                        <p className="text-primary font-medium mb-1">
                          {contact.content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contact.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-card border border-border rounded-xl">
                  <h4 className="font-semibold text-card-foreground mb-3">
                    Office Hours
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monday - Friday:
                      </span>
                      <span className="text-card-foreground">
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="text-card-foreground">
                        10:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="text-card-foreground">Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-6">
                    Send Us a Message
                  </h3>
                  <form className="space-y-6" aria-label="Contact form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-card-foreground mb-2"
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="first-name"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter your first name"
                          aria-label="First name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-card-foreground mb-2"
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="last-name"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter your last name"
                          aria-label="Last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-card-foreground mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter your email address"
                        aria-label="Email address"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="travel-type"
                        className="block text-sm font-medium text-card-foreground mb-2"
                      >
                        Travel Interest
                      </label>
                      <select
                        id="travel-type"
                        name="travelType"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground"
                        aria-label="Select your travel interest"
                      >
                        <option value="">Select your travel interest</option>
                        <option value="adventure">Adventure Tours</option>
                        <option value="cultural">Cultural Experiences</option>
                        <option value="luxury">Luxury Travel</option>
                        <option value="family">Family Vacations</option>
                        <option value="business">Business Travel</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-card-foreground mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm transition-all duration-200 ease-out bg-background text-foreground placeholder:text-muted-foreground resize-vertical"
                        placeholder="Tell us about your dream destination and travel preferences..."
                        aria-label="Your message"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-hover shadow-lg flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Send your message to MALVORA"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 sm:p-12 text-primary-foreground relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  Ready for Your Next Adventure?
                </h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                  Let our expert team create a personalized travel experience
                  that exceeds your expectations. Your dream destination is just
                  one conversation away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-background text-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-background/90 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Start planning your trip with MALVORA"
                  >
                    Plan Your Trip
                  </motion.button>
                  <motion.button
                    className="border-2 border-primary-foreground text-primary-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:bg-primary-foreground hover:text-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View our travel destinations"
                  >
                    View Destinations
                  </motion.button>
                </div>
              </div>
              <div
                className="absolute inset-0 bg-foreground/10"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
