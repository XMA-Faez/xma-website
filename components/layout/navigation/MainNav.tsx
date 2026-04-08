"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mainNavItems, solutions, servicePages, industryPages } from "@/data/navigation";
import { useTrackNavigation } from "@/hooks/useTrackEvent";

const NAV_LINK_CLASSES =
  "px-4 py-2 text-sm transition-colors duration-200 text-zinc-400 hover:text-white";

const EXCLUDED_NAV_ITEMS = ["Home", "Solutions"];

const MEGA_MENU_SERVICE_LIMIT = 6;
const MEGA_MENU_INDUSTRY_LIMIT = 6;

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const trackNavigation = useTrackNavigation();

  const filteredNavItems = mainNavItems.filter(
    (item) => !EXCLUDED_NAV_ITEMS.includes(item.name)
  );

  const visibleServices = servicePages.slice(0, MEGA_MENU_SERVICE_LIMIT);
  const visibleIndustries = industryPages.slice(0, MEGA_MENU_INDUSTRY_LIMIT);

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
            Solutions
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            sideOffset={4}
            disablePortal
            className="min-w-[720px] rounded-2xl border border-zinc-700/50 bg-zinc-900/80 backdrop-blur-xl p-4 shadow-lg data-[state=closed]:slide-out-to-bottom-2 data-[state=open]:slide-in-from-bottom-2 duration-200"
          >
            <div className="grid grid-cols-3 gap-6">
              <MegaMenuColumn
                title="Solutions"
                items={solutions.map((s) => ({ name: s.name, href: s.href }))}
                onItemClick={(name, href) => {
                  setIsOpen(false);
                  trackNavigation(name, href, "header");
                }}
              />

              <MegaMenuColumn
                title="Services"
                items={visibleServices}
                viewAllHref="/services-hub"
                viewAllLabel={`View all ${servicePages.length} services`}
                onItemClick={(name, href) => {
                  setIsOpen(false);
                  trackNavigation(name, href, "header");
                }}
              />

              <MegaMenuColumn
                title="Industries"
                items={visibleIndustries}
                viewAllHref="/industries-hub"
                viewAllLabel={`View all ${industryPages.length} industries`}
                onItemClick={(name, href) => {
                  setIsOpen(false);
                  trackNavigation(name, href, "header");
                }}
              />
            </div>
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
    </nav>
  );
}

function MegaMenuColumn({
  title,
  items,
  viewAllHref,
  viewAllLabel,
  onItemClick,
}: {
  title: string;
  items: { name: string; href: string }[];
  viewAllHref?: string;
  viewAllLabel?: string;
  onItemClick: (name: string, href: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-3 px-2">
        {title}
      </span>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="rounded-lg px-2 py-1.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors duration-150"
            onClick={() => onItemClick(item.name, item.href)}
          >
            {item.name}
          </Link>
        ))}
      </div>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className="mt-3 pt-3 border-t border-zinc-800/50 px-2 flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-white transition-colors duration-150"
          onClick={() => onItemClick(viewAllLabel, viewAllHref)}
        >
          {viewAllLabel}
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}
