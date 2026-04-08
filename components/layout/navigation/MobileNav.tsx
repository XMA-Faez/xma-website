import React, { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mainNavItems, solutions, servicePages, industryPages } from "@/data/navigation";
import { ScanningButton } from "@/components/ui/ScanningButton";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-zinc-300 hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] bg-black/95 border-zinc-800"
      >
        <nav className="flex flex-col space-y-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-zinc-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}

          <CollapsibleNavSection
            title="Solutions"
            items={solutions.map((s) => ({ name: s.name, href: s.href }))}
            onItemClick={toggleMenu}
          />

          <CollapsibleNavSection
            title="Services"
            items={servicePages}
            viewAllHref="/services-hub"
            onItemClick={toggleMenu}
          />

          <CollapsibleNavSection
            title="Industries"
            items={industryPages}
            viewAllHref="/industries-hub"
            onItemClick={toggleMenu}
          />

          <Link href="/book" onClick={toggleMenu}>
            <ScanningButton variant="primary" size="sm" className="w-full">
              Book a Call
            </ScanningButton>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function CollapsibleNavSection({
  title,
  items,
  viewAllHref,
  onItemClick,
}: {
  title: string;
  items: { name: string; href: string }[];
  viewAllHref?: string;
  onItemClick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t border-zinc-800 pt-2">
      <button
        className="flex items-center justify-between w-full text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="mt-2 ml-2 flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="py-1.5 text-sm text-zinc-300 hover:text-white transition-colors"
              onClick={onItemClick}
            >
              {item.name}
            </Link>
          ))}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="mt-1 pt-2 border-t border-zinc-800/50 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
              onClick={onItemClick}
            >
              View all
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
