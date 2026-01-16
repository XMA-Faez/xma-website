"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mainNavItems, services } from "@/data/navigation";
import { useTrackNavigation } from "@/hooks/useTrackEvent";

const NAV_LINK_CLASSES =
  "px-4 py-2 text-sm transition-colors duration-200 text-zinc-400 hover:text-white";

const EXCLUDED_NAV_ITEMS = ["Home", "Services", "Contact"];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const trackNavigation = useTrackNavigation();

  const filteredNavItems = mainNavItems.filter(
    (item) => !EXCLUDED_NAV_ITEMS.includes(item.name)
  );

  return (
    <nav className="flex items-center gap-1">
      <Link
        href="/"
        className={NAV_LINK_CLASSES}
        onClick={() => trackNavigation("Home", "/", "header")}
      >
        Home
      </Link>

      <DropdownMenu open={isOpen} modal={false}>
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <DropdownMenuTrigger
            className={`${NAV_LINK_CLASSES} group flex items-center gap-1 outline-none data-[state=open]:text-white`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onPointerDown={(e) => e.preventDefault()}
          >
            Services
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={4}
            disablePortal
            className="min-w-[160px] rounded-2xl border border-zinc-700/50 bg-zinc-900/80 backdrop-blur-xl p-1 shadow-lg data-[state=closed]:slide-out-to-bottom-2 data-[state=open]:slide-in-from-bottom-2 duration-200"
          >
            <DropdownMenuGroup>
              {services.map((service) => (
                <DropdownMenuItem
                  key={service.name}
                  asChild
                  className="cursor-pointer rounded-xl px-3 py-2 text-zinc-300 hover:text-white focus:bg-white/10 focus:text-white"
                >
                  <Link
                    href={service.href}
                    onClick={() => {
                      setIsOpen(false);
                      trackNavigation(service.name, service.href, "header");
                    }}
                  >
                    {service.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>

      {filteredNavItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={NAV_LINK_CLASSES}
          onClick={() => trackNavigation(item.name, item.href, "header")}
        >
          {item.name}
        </Link>
      ))}

      <Link
        href="/contact"
        className={NAV_LINK_CLASSES}
        onClick={() => trackNavigation("Contact", "/contact", "header")}
      >
        Contact
      </Link>
    </nav>
  );
}
