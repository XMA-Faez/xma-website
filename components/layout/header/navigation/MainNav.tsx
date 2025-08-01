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
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
              pathname === "/" 
                ? "text-white font-medium glass-primary "
                : "text-zinc-300 hover:text-white hover:glass-tertiary"
            }`}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Services Dropdown */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="px-4 py-2 text-sm rounded-xl text-zinc-300 hover:text-white hover:glass-tertiary transition-all duration-300">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="border-blue-500/20 rounded-2xl p-4 w-[800px]">
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="flex items-start space-x-3 rounded-xl p-3 glass-tertiary hover:glass-secondary hover:electric-glow transition-all duration-300"
                    >
                      <Icon className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {service.name}
                        </div>
                        <p className="text-sm text-zinc-300 max-w-[300px]">
                          {service.description}
                        </p>
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
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
              pathname === "/about" 
                ? "text-white font-medium glass-primary electric-glow" 
                : "text-zinc-300 hover:text-white hover:glass-tertiary"
            }`}
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Blog */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/blog"
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
              pathname === "/blog" || pathname.startsWith("/blog/") 
                ? "text-white font-medium glass-primary electric-glow" 
                : "text-zinc-300 hover:text-white hover:glass-tertiary"
            }`}
          >
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
              pathname === "/contact" 
                ? "text-white font-medium glass-primary electric-glow" 
                : "text-zinc-300 hover:text-white hover:glass-tertiary"
            }`}
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
