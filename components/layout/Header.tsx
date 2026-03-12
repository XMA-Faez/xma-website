"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MainNav } from "./navigation/MainNav";
import { MobileNav } from "./navigation/MobileNav";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { useTrackNavigation, useTrackCTA } from "@/hooks/useTrackEvent";

const SCROLLED_VARIANT = { marginTop: "16px", borderRadius: "100px" };
const DEFAULT_VARIANT = { marginTop: 0, borderRadius: "100px" };

const CRM_PATHS = ["/solutions/crm-system", "/services/crm-solution"];

function getHeaderCTA(pathname: string) {
  if (CRM_PATHS.some((path) => pathname.startsWith(path))) {
    return { label: "Book a Demo", href: "/book-crm", color: "emerald" as const };
  }
  return { label: "Book a Call", href: "/book", color: "blue" as const };
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const pathname = usePathname();
  const trackNavigation = useTrackNavigation();
  const trackCTA = useTrackCTA();
  const scrollRafRef = useRef<number>(0);
  const cta = getHeaderCTA(pathname);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 0);
      scrollRafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [pathname, handleScroll]);

  return (
    <motion.nav
      className="fixed top-0 left-1/2 max-w-6xl xl:max-w-7xl -translate-x-1/2 transform z-50 h-16 w-full sm:px-4 md:px-6"
    >
      {isDesktop ? (
        <motion.div
          animate={isScrolled ? SCROLLED_VARIANT : DEFAULT_VARIANT}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={`flex py-4 items-center justify-between text-slate-900 dark:text-white px-8 mx-auto ${
            !isScrolled ? "bg-transparent" : "backdrop-blur-lg bg-white/50 border border-slate-300/50 dark:bg-zinc-800/50 dark:border-zinc-700/50"
          }`}
        >
          {/* Logo */}
          <div className="flex-grow h-full flex-shrink-0 basis-0">
            <Link
              className="block w-fit"
              href="/"
              onClick={() => trackNavigation("Logo", "/", "header")}
            >
              <Image
                src="/XMA-White.svg"
                alt="XMA Logo"
                width={100}
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
          <div className="flex-grow flex-shrink-0 basis-0 flex justify-end items-center gap-4">
            <Link href={cta.href}>
              <ScanningButton
                variant="primary"
                size="sm"
                color={cta.color}
                onClick={() => {
                  trackCTA(cta.label, "header", {
                    destination: cta.href,
                  });
                }}
              >
                {cta.label}
              </ScanningButton>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div
          className={`${isScrolled ? "backdrop-blur-lg bg-zinc-900/80 border-b border-zinc-700/50" : "bg-transparent"}
            flex h-full items-center text-white px-4 mx-auto duration-300 transition-all`}
        >
          <div className="flex-grow h-full flex items-center flex-shrink-0 basis-0">
            <Link className="block w-fit" href="/">
              <Image
                src="/XMA-White.svg"
                alt="XMA Logo"
                width={100}
                height={50}
                priority
              />
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-grow flex-shrink-0 basis-0 flex justify-end items-center gap-3">
            <MobileNav />
          </div>
        </div>
      )}
    </motion.nav>
  );
}
