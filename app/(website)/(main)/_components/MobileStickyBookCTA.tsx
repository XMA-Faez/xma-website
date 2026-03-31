"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScanningButton } from "@/components/ui/ScanningButton";

const SCROLL_THRESHOLD = 500;

const CRM_PATHS = ["/solutions/crm-system", "/services/crm-solution"];

function getCTA(pathname: string) {
  if (CRM_PATHS.some((path) => pathname.startsWith(path))) {
    return { label: "Book a Demo", href: "/book-crm", color: "emerald" as const };
  }
  return { label: "Book a Call", href: "/book", color: "blue" as const };
}

export default function MobileStickyBookCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const rafRef = useRef<number>(0);
  const cta = getCTA(pathname);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800/50 px-4 py-3">
            <Link href={cta.href} className="block">
              <ScanningButton
                variant="primary"
                size="md"
                color={cta.color}
                className="w-full"
              >
                {cta.label}
              </ScanningButton>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
