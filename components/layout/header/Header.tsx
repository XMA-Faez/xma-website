"use client"

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MainNav } from './navigation/MainNav';
import { MobileNav } from './navigation/MobileNav';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <motion.nav
      className={`${
        isScrolled ? "container" : ""
      } fixed top-0 left-1/2 -translate-x-1/2 transform z-50 h-16 w-full`}
    >
      {isDesktop ? (
        <motion.div
          animate={{
            backgroundColor:
              pathname === "/" && !isScrolled
                ? "transparent"
                : "rgba(0, 0, 0, 0.4)",
            marginTop: pathname === "/" && !isScrolled ? 0 : "16px",
            borderRadius: pathname === "/" && !isScrolled ? "0px" : "16px",
            backdropFilter:
              pathname === "/" && !isScrolled ? "none" : "blur(10px)",
            boxShadow:
              pathname === "/" && !isScrolled
                ? "none"
                : "0px 10px 30px rgba(0,0,0,0.2)",
          }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="flex py-4 items-center justify-between text-fg container px-8 mx-auto"
        >
          {/* Logo */}
          <div className="flex-grow flex-shrink-0 basis-0">
            <Link className="block w-fit" href="/">
              <Image 
                src="/XMA-White.svg" 
                alt="XMA Logo" 
                width={50} 
                height={50} 
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="flex-grow flex justify-center">
            <MainNav />
          </div>

          {/* CTA Button */}
          <div className="flex-grow flex-shrink-0 basis-0 flex justify-end">
            <Link href="#cta">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Book Your Call Now
              </button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div
          className={`${isScrolled ? 'bg-black/50' : 'bg-transparent'}
            flex h-full items-center text-fg px-8 mx-auto duration-300 backdrop-blur-md transition-colors`}
        >
          <div className="flex-grow flex-shrink-0 basis-0">
            <Link className="block w-fit" href="#cta">
              <Image 
                src="/XMA-White.svg" 
                alt="XMA Logo" 
                width={50} 
                height={50} 
                priority
              />
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-grow flex-shrink-0 basis-0 flex justify-end">
            <MobileNav />
          </div>
        </div>
      )}
    </motion.nav>
  );
}
