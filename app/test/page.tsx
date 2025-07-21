"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const NavigationHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home', isActive: true },
    { href: '/malaysia', label: 'Malaysia', isActive: false },
    { href: '/packages', label: 'Packages', isActive: false },
    { href: '/gallery', label: 'Gallery', isActive: false },
    { href: '/contact', label: 'Contact', isActive: false },
  ];

  const socialLinks = [
    {
      href: 'https://www.facebook.com/profile.php?id=61565333016423&mibextid=LQQJ4d',
      icon: Facebook,
      label: 'Facebook'
    },
    {
      href: 'https://youtube.com/@kairalitrails?si=j-xn2WjwqtPTMabQ',
      icon: Youtube,
      label: 'YouTube'
    },
    {
      href: 'https://www.instagram.com/kairalitrails?igsh=MWIyMHNub3RycXlueQ==',
      icon: Instagram,
      label: 'Instagram'
    },
    {
      href: 'https://www.linkedin.com/company/kairali-trails/',
      icon: Linkedin,
      label: 'LinkedIn'
    }
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <div className="relative flex items-center justify-center h-full z-[51]">
        {/* Logo */}
        <Link href="/" className="absolute left-0">
          <Image
            alt="Kairali Trails Logo"
            width={64}
            height={64}
            className="h-16 w-16 main-logo"
            src="/logo.png" // You'll need to add this to your public folder
            priority
          />
        </Link>

        {/* Menu Toggle */}
        <div 
          className="w-[10rem] relative flex flex-row justify-center items-center gap-2 cursor-pointer"
          onClick={toggleMenu}
        >
          <span className={`burger relative ${isMenuOpen ? 'active' : ''}`}></span>
          <p className="text-dark transition duration-500 md:text-lg">Menu</p>
        </div>

        {/* Contact Button */}
        <Link
          href="/contact"
          className="flex items-center justify-center px-5 py-3 rounded-full transition duration-300 ease-in-out text-sm overflow-hidden box-border z-0 border-accent-500 border-[1px] text-accent-500 before:absolute before:inset-0 before:bg-accent-500 hover:text-white before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:transition-transform before:duration-1000 before:content-[''] hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95 absolute right-0 contact-btn"
        >
          Contact
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="overflow-hidden absolute top-0 left-0 right-0 bg-accent-500 section h-screen">
          <div className="flex gap-10 my-20">
            <div className="flex flex-col justify-between">
              {/* Navigation Links */}
              <div className="flex flex-wrap mt-10 font-primary">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <p
                      className={`flex overflow-hidden text-5xl lg:text-[4rem] pr-10 pt-3 will-change-transform ${
                        link.isActive
                          ? 'filter-none opacity-100'
                          : 'blur-sm opacity-80'
                      }`}
                    >
                      {link.label.split('').map((char, index) => (
                        <span
                          key={index}
                          className="opacity-100 will-change-transform transform-none"
                        >
                          {char}
                        </span>
                      ))}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Footer Section */}
              <div className="flex flex-wrap items-end uppercase mt-7 md:gap-16 text-light">
                {/* Social Links */}
                <ul className="nav-ul w-auto mb-3 sm:mb-0">
                  <div className="flex flex-row gap-[0.6rem] opacity-100 will-change-transform transform-none">
                    <div className="flex items-center gap-[0.6rem]">
                      {socialLinks.map((social) => (
                        <Link
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center transition duration-300 ease-in-out rounded-[100%] p-4 hover:bg-accent-900 bg-white text-accent-500 hover:text-accent-50"
                        >
                          <social.icon size={21} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </ul>

                {/* Policy Links */}
                <ul className="nav-ul w-full sm:w-1/2 md:w-auto">
                  <li className="opacity-100 will-change-transform transform-none">
                    <Link
                      href="/policies/privacy-policy"
                      className="hover:text-accent-900 transition-all"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="opacity-100 will-change-transform transform-none">
                    <Link
                      href="/policies/terms-and-conditions"
                      className="hover:text-accent-900 transition-all"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>

                {/* Contact Links */}
                <ul className="nav-ul w-1/2 md:w-auto">
                  <li className="opacity-100 will-change-transform transform-none">
                    <Link
                      href="mailto:contact@Kairalitrails.com"
                      className="flex flex-row items-center gap-1 hover:text-accent-900 transition-all"
                    >
                      <Mail size={16} />
                      Email
                    </Link>
                  </li>
                </ul>

                <ul className="nav-ul w-1/2 md:w-auto">
                  <li className="opacity-100 will-change-transform transform-none">
                    <Link
                      href="tel:+918714970917"
                      className="flex flex-row items-center gap-1 hover:text-accent-900 transition-all"
                    >
                      <Phone size={16} />
                      Phone
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Side Image */}
            <div className="hidden lg:block w-[400px] h-[330px] relative opacity-100 will-change-transform">
              <Image
                alt="Navigation image"
                width={800}
                height={1500}
                className="object-cover h-[330px] w-[285px] p-2 bg-white"
                src="/nav-image.webp" // You'll need to add this to your public folder
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* CSS for burger animation */}
      <style jsx>{`
        .burger {
          width: 20px;
          height: 2px;
          background-color: #333;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .burger::before,
        .burger::after {
          content: '';
          width: 20px;
          height: 2px;
          background-color: #333;
          position: absolute;
          transition: all 0.3s ease;
        }
        
        .burger::before {
          top: -6px;
        }
        
        .burger::after {
          bottom: -6px;
        }
        
        .burger.active {
          background-color: transparent;
        }
        
        .burger.active::before {
          transform: rotate(45deg);
          top: 0;
        }
        
        .burger.active::after {
          transform: rotate(-45deg);
          bottom: 0;
        }
      `}</style>
    </>
  );
};

export default function TestFunction() {
  return (
    <NavigationHeader />
  )
}
