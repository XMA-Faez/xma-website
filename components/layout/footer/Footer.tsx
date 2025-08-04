"use client";

import footerData from "@/data/footerData";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="py-12 bg-white/60 dark:bg-black/40 backdrop-blur-sm border-t border-slate-200/60 dark:border-zinc-800/60">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            {mounted && (
              <Image
                src={theme === "light" ? "/XMA-01.svg" : "/XMA-White.svg"}
                alt="XMA Logo"
                width={200}
                height={200}
                className="mb-4"
              />
            )}
            <p className="text-slate-600 dark:text-zinc-300 mb-6">
              {footerData.company.description}
            </p>
            <div className="space-y-3">
              {footerData.company.contact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-slate-600 dark:text-zinc-300 hover:text-blue-400 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-blue-400" />
                    {item.isClickable ? (
                      <a href={item.href}>{item.text}</a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerData.services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="flex items-center gap-2 text-slate-600 dark:text-zinc-300 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span>{service.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-zinc-300 hover:text-blue-400 transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-300/60 dark:border-zinc-800/60">
          <p className="text-slate-500 dark:text-zinc-400">
            © {new Date().getFullYear()} {footerData.company.name}. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            {footerData.legal.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 text-slate-600 dark:text-zinc-300 hover:text-blue-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.text}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
