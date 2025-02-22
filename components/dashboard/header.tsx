"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, Home, LogOut, Settings } from "lucide-react";
import { logout } from "@/actions/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscriptions",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="w-4 h-4" />,
  },
];

interface HeaderProps {
  user: SupabaseUser;
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <Link href="/dashboard">
        <h1 className="text-2xl font-bold">
          7seb<span className="text-primary">Sub</span>
        </h1>
      </Link>

      <div className="flex items-center gap-6">
        <NavigationMenu />
        <UserNav user={user} />
      </div>
    </div>
  );
}

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/dashboard" && pathname === "/dashboard") {
    return true;
  }
  return href !== "/dashboard" && pathname.startsWith(href);
}

function NavigationMenu() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6">
      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = isActiveRoute(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="hidden sm:inline-block">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function UserNav({ user }: { user: SupabaseUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.user_metadata?.avatar_url}
              alt={user?.user_metadata?.name || "User"}
            />
            <AvatarFallback>
              {user?.user_metadata?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user_metadata?.name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild></DropdownMenuItem>
        </DropdownMenuGroup>

        <form action={logout}>
          <DropdownMenuItem asChild className="cursor-pointer text-red-500">
            <button className="w-full flex items-center">
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
