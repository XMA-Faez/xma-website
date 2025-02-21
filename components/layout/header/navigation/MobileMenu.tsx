import React, { useState } from "react";
import Link from "next/link";

const items = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#about-us",
  },
  {
    name: "Contact",
    href: "#contact-us",
  },
];

const MobileMenu = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 z-20"
      >
        <div
          className={`bg-fg w-6 h-1 mb-1 transition duration-300`}
          style={{
            transform: isOpen
              ? "rotate(45deg) translate(5px, 5px)"
              : "rotate(0)",
          }}
        ></div>
        <div
          className={`bg-fg w-6 h-1 mb-1 transition duration-300`}
          style={{ opacity: isOpen ? "0" : "1" }}
        ></div>
        <div
          className={`bg-fg w-6 h-1 mb-1 transition duration-300`}
          style={{
            transform: isOpen
              ? "rotate(-45deg) translate(5px, -5px)"
              : "rotate(0)",
          }}
        ></div>
      </button>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-fg z-20 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          { items.map((item, index) => (
            <Link
              onClick={toggleMenu}
              key={item.name} href={item.href} className="text-gray-700 text-lg font-semibold">
              {item.name}

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
