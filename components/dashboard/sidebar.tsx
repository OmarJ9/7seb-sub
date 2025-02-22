"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CreditCard,
  Menu,
  LayoutDashboard,
  User,
  Settings,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscriptions",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: <User className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed left-4 top-4"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SheetTitle className="px-6 pt-6">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 mr-2" />
              <span className="font-semibold">SubManager</span>
            </div>
          </SheetTitle>
          <MobileNav items={navItems} pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <nav className="hidden lg:block fixed left-0 w-[240px] h-screen border-r bg-background">
        <DesktopNav items={navItems} pathname={pathname} />
      </nav>
      <div className="lg:pl-[240px]" />
    </>
  );
}

function isActiveRoute(pathname: string, href: string): boolean {
  // Exact match for dashboard home
  if (href === "/dashboard" && pathname === "/dashboard") {
    return true;
  }
  // For other routes, check if pathname starts with href
  // but only if href is not dashboard home
  return href !== "/dashboard" && pathname.startsWith(href);
}

function MobileNav({
  items,
  pathname,
  setOpen,
}: {
  items: NavItem[];
  pathname: string;
  setOpen: (open: boolean) => void;
}) {
  return (
    <ScrollArea className="h-full py-6">
      <div className="space-y-1 px-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActiveRoute(pathname, item.href)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}

function DesktopNav({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  return (
    <ScrollArea className="h-full py-6">
      <div className="flex items-center px-6 mb-6">
        <CreditCard className="w-6 h-6 mr-2" />
        <span className="font-semibold">SubManager</span>
      </div>
      <div className="space-y-1 px-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActiveRoute(pathname, item.href)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
