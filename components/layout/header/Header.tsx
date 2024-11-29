"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/XMA Lead Flow Logo.webp";
import HeaderItems from "./HeaderItems";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
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
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
      } fixed top-0 left-1/2 -translate-x-1/2 transform z-50 h-20 w-full`}
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
          className={`flex py-4 items-center text-fg container px-8 mx-auto`}
        >
          <div className="flex-grow flex-shrink-0 basis-0 mr-auto">
            <Link className="block w-fit" href="/">
              <Image src={Logo} alt="Qoo About" width={50} height={50} />
            </Link>
          </div>
          <HeaderItems />
          <div className="ml-auto flex justify-end flex-grow flex-shrink-0 basis-0">
            <div className="md:hidden">
              <MobileMenu isScrolled={isScrolled} />
            </div>
            <div className="hidden md:block">
              <button className="button--calypso inline-block relative bg-fg px-6 py-2 text-black">
                <span>Schedule a Demo</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div
          className={`${isScrolled ? `bg-black/50` : `bg-transparent`}
        flex items-center text-fg px-8 mx-auto duration-300 backdrop-blur-md transition-colors`}
        >
          <div className="flex-grow flex-shrink-0 basis-0 mr-auto">
            <Link className="block w-fit" href="/">
              <Image src={Logo} alt="Qoo About" width={50} height={50} />
            </Link>
          </div>
          <HeaderItems />
          <div className="ml-auto flex justify-end flex-grow flex-shrink-0 basis-0">
            <div className="md:hidden">
              <MobileMenu isScrolled={isScrolled} />
            </div>
            <div className="hidden md:block">
              <button className="py-2 px-4 rounded-main bg-accent text-fg hover:bg-orange-500 transition-colors">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
