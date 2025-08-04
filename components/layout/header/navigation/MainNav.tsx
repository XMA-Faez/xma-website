import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { services } from "@/data/navigation";

export function MainNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="flex justify-center">
      <NavigationMenuList className="flex items-center space-x-4">
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              pathname === "/"
                ? "text-slate-900 dark:text-white font-medium glass-primary electric-glow"
                : "text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:glass-tertiary hover:scale-105"
            }`}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Services Dropdown */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="px-4 py-2 text-sm rounded-full text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:glass-tertiary transition-all duration-300 group">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-gray-500/20 shadow-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-0 w-[420px]">
            <div className="p-6 min-w-[420px] space-y-1">
              {/* Service Items */}
              <div className="space-y-2">
                {services.map((service, index) => {
                  return service.comingSoon ? (
                    <div
                      key={service.name}
                      className="group relative flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300/50 dark:border-gray-600/50 opacity-60 cursor-not-allowed overflow-hidden dropdown-item-enter"
                      style={{
                        animationDelay: `${index * 75}ms`,
                      }}
                    >
                      {/* Subtle background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/[0.02] to-transparent opacity-50" />

                      <div className="relative z-10 flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 truncate">
                            {service.name}
                          </h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-600/50 flex-shrink-0">
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="group relative flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300/50 dark:border-gray-600/50 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all duration-300 ease-out overflow-hidden hover:scale-[1.01] hover:-translate-y-0.5 dropdown-item-enter"
                      style={{
                        animationDelay: `${index * 75}ms`,
                      }}
                    >
                      {/* Dynamic background gradient */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-gray-500/[0.04] via-gray-400/[0.02] to-transparent" />

                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-gray-500/5" />

                      <div className="relative z-10 flex-1 min-w-0">
                        <h4 className="text-sm font-medium mb-1 transition-colors duration-300 text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-gray-50">
                          {service.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-zinc-400 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <div className="relative z-10 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <svg
                          className="w-4 h-4 text-slate-500 dark:text-zinc-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              pathname === "/about"
                ? "text-slate-900 dark:text-white font-medium glass-primary electric-glow"
                : "text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:glass-tertiary hover:scale-105"
            }`}
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Blog */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/blog"
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              pathname === "/blog" || pathname.startsWith("/blog/")
                ? "text-slate-900 dark:text-white font-medium glass-primary electric-glow"
                : "text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:glass-tertiary hover:scale-105"
            }`}
          >
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              pathname === "/contact"
                ? "text-slate-900 dark:text-white font-medium glass-primary electric-glow"
                : "text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:glass-tertiary hover:scale-105"
            }`}
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
