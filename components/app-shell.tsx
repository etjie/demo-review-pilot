"use client";

import clsx from "clsx";
import {
  BarChart3,
  Bot,
  ClipboardList,
  Gauge,
  Megaphone,
  MessageSquareText
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/reviews", label: "Reviews", icon: MessageSquareText },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/agents", label: "Agents", icon: Bot }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-line bg-white/90 px-4 py-4 backdrop-blur lg:min-h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white shadow-soft">
            <ClipboardList className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-normal">ReviewPilot</span>
            <span className="block text-xs font-medium text-slate-500">Reputation command center</span>
          </span>
        </Link>

        <nav className="mt-5 flex gap-2 overflow-x-auto lg:mt-8 lg:block lg:space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex min-w-fit items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-ink text-white shadow-soft"
                    : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 hidden rounded-lg border border-cyan-100 bg-cyan-50 p-4 text-sm text-cyan-950 lg:block">
          <div className="mb-1 flex items-center gap-2 font-semibold">
            <BarChart3 className="h-4 w-4" />
            Demo Mode
          </div>
          <p className="text-cyan-800">Mock data only. No auth, APIs, or backend services are connected.</p>
        </div>
      </aside>

      <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}
