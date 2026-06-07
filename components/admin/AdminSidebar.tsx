"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Clock,
  LayoutDashboard,
  LogOut,
  Scissors,
  Users,
} from "lucide-react";
import { cn } from "@/components/ui/shadcn/utils";
import { Button } from "@/components/ui/shadcn/button";
import { logoutAction } from "@/app/(admin)/actions/auth";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reservations", label: "Reservations", icon: Clock },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/services", label: "Services", icon: Scissors },
  { href: "/availability", label: "Availability", icon: Clock },
];

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-card">
      <div className="border-b border-border p-6">
        <p className="text-lg font-semibold">Nafas Admin</p>
        <p className="text-sm text-muted-foreground">{userName}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
              pathname === href || pathname.startsWith(`${href}/`)
                ? "bg-accent font-medium"
                : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <form action={logoutAction} className="border-t border-border p-4">
        <Button type="submit" variant="outline" className="w-full justify-start gap-2">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </form>
    </aside>
  );
}
