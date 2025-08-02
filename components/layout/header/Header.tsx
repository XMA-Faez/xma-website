"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MainNav } from "./navigation/MainNav";
import { MobileNav } from "./navigation/MobileNav";
import { ScanningButton } from "@/components/ui/ScanningButton";

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

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <motion.nav
      className={`${
        isScrolled ? "" : ""
      } fixed top-0 left-1/2 max-w-7xl -translate-x-1/2 transform z-50 h-16 w-full`}
    >
      {isDesktop ? (
        <motion.div
          animate={{
            marginTop: !isScrolled ? 0 : "16px",
            borderRadius: !isScrolled ? "0px" : "24px",
          }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={`flex py-4 items-center justify-between text-white container px-8 mx-auto ${
            !isScrolled
              ? "bg-transparent"
              : "glass-nav-light bg-zinc-900/5"
          }`}
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
            <Link href="/book">
              <ScanningButton
                variant="primary"
                size="sm"
                color={
                  pathname === "/services/crm-solution" ? "emerald" : "blue"
                }
              >
                Book Your Call Now
              </ScanningButton>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div
          className={`${isScrolled ? "glass-nav-light" : "bg-transparent"}
            flex h-full items-center text-white px-8 mx-auto duration-300 transition-all`}
        >
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

          {/* Mobile Navigation */}
          <div className="flex-grow flex-shrink-0 basis-0 flex justify-end">
            <MobileNav />
          </div>
        </div>
      )}
    </motion.nav>
  );
}
