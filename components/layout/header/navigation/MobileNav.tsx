import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mainNavItems, services } from "@/data/navigation";

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
          <div className="py-2 border-t border-zinc-800">
            <div className="text-sm font-medium text-zinc-400 mb-2">
              Services
            </div>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.name}
                  href={service.href}
                  className="flex items-center space-x-2 py-2 text-zinc-300 hover:text-white transition-colors"
                  onClick={toggleMenu}
                >
                  <Icon className="h-4 w-4 text-red-500" />
                  <span>{service.name}</span>
                </Link>
              );
            })}
          </div>
          <Link href="/#cta" onClick={toggleMenu}>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Book Your Strategy Call
            </button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
