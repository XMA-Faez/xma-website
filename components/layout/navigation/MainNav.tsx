import Link from "next/link";
import { CaretRight } from "phosphor-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { mainNavItems, services } from "@/data/navigation";
import { useTrackNavigation } from "@/hooks/useTrackEvent";

const NAV_LINK_CLASSES =
  "px-4 py-2 text-sm rounded-full transition-all duration-300 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:glass-tertiary hover:scale-105";

const EXCLUDED_NAV_ITEMS = ["Home", "Services", "Contact"];

interface ServiceItemProps {
  name: string;
  href: string;
  description: string;
  animationDelay: string;
  onNavigate: () => void;
}

function ServiceLink({
  name,
  href,
  description,
  animationDelay,
  onNavigate,
}: ServiceItemProps) {
  return (
    <Link
      href={href}
      className="group relative flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300/50 dark:border-gray-600/50 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 dropdown-item-enter"
      style={{ animationDelay }}
      onClick={onNavigate}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-gray-500/[0.04] via-gray-400/[0.02] to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-gray-500/5" />

      <div className="relative z-10 flex-1 min-w-0">
        <h4 className="text-sm font-medium mb-1 transition-colors duration-300 text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-gray-50">
          {name}
        </h4>
        <p className="text-sm text-slate-600 dark:text-zinc-400 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative z-10 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
        <CaretRight
          weight="bold"
          className="w-4 h-4 text-slate-500 dark:text-zinc-400"
        />
      </div>
    </Link>
  );
}

interface ComingSoonServiceProps {
  name: string;
  description: string;
  animationDelay: string;
}

function ComingSoonService({
  name,
  description,
  animationDelay,
}: ComingSoonServiceProps) {
  return (
    <div
      className="group relative flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300/50 dark:border-gray-600/50 opacity-60 cursor-not-allowed dropdown-item-enter"
      style={{ animationDelay }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/[0.02] to-transparent opacity-50" />

      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 truncate">
            {name}
          </h4>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-600/50 flex-shrink-0">
            Coming Soon
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function MainNav() {
  const trackNavigation = useTrackNavigation();

  const filteredNavItems = mainNavItems.filter(
    (item) => !EXCLUDED_NAV_ITEMS.includes(item.name)
  );

  return (
    <NavigationMenu className="flex justify-center">
      <NavigationMenuList className="flex items-center space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className={NAV_LINK_CLASSES}
            onClick={() => trackNavigation("Home", "/", "header")}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className={NAV_LINK_CLASSES}>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-gray-500/20 shadow-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-0 w-[420px]">
            <div className="p-6 min-w-[420px] space-y-2">
              {services.map((service, index) =>
                service.comingSoon ? (
                  <ComingSoonService
                    key={service.name}
                    name={service.name}
                    description={service.description}
                    animationDelay={`${index * 75}ms`}
                  />
                ) : (
                  <ServiceLink
                    key={service.name}
                    name={service.name}
                    href={service.href}
                    description={service.description}
                    animationDelay={`${index * 75}ms`}
                    onNavigate={() =>
                      trackNavigation(service.name, service.href, "header")
                    }
                  />
                )
              )}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {filteredNavItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink
              href={item.href}
              className={NAV_LINK_CLASSES}
              onClick={() => trackNavigation(item.name, item.href, "header")}
            >
              {item.name}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className={NAV_LINK_CLASSES}
            onClick={() => trackNavigation("Contact", "/contact", "header")}
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
