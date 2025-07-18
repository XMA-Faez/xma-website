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
            className={`px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors
${pathname === "/" ? "text-white font-medium" : ""}`}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Services Dropdown */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="text-zinc-300 hover:text-white">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-4 w-[800px]">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-start space-x-3 rounded-lg p-3 hover:bg-zinc-800/50 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-sm font-medium text-white">
                        {service.name}
                      </div>
                      <p className="text-sm text-zinc-400 max-w-[300px]">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className={`px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors
${pathname === "/about" ? "text-white font-medium" : ""}`}
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Blog */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/blog"
            className={`px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors
${pathname === "/blog" || pathname.startsWith("/blog/") ? "text-white font-medium" : ""}`}
          >
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className={`px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors
${pathname === "/contact" ? "text-white font-medium" : ""}`}
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
