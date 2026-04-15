"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";

const navItems = [{ href: "/calendar", label: "Calendar" }];

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const navId = useId();

  return (
    <div className="flex min-h-0 w-full flex-1">
      <aside
        id={navId}
        className={`flex shrink-0 flex-col border-foreground/10 bg-background transition-[width,opacity,border-color] duration-200 ease-out ${
          expanded
            ? "w-64 border-r opacity-100"
            : "w-0 overflow-hidden border-transparent opacity-0"
        }`}
        aria-hidden={!expanded}
      >
        <div className="flex items-center justify-between gap-2 border-b border-foreground/10 p-3">
          <span className="truncate text-lg font-semibold tracking-tight">
            Chore Wheel
          </span>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="inline-flex min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 active:opacity-70"
            aria-expanded={expanded}
            aria-controls={navId}
            aria-label="Collapse menu"
          >
            ⟨
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-3" aria-label="Main">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 items-center rounded-lg px-4 py-3 text-base font-medium touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 active:opacity-80 ${
                  active
                    ? "bg-foreground/10 text-foreground"
                    : "text-foreground/80"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="fixed top-3 left-3 z-20 inline-flex min-h-11 touch-manipulation items-center justify-center rounded-lg border border-foreground/15 bg-background px-4 text-base font-medium shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 active:opacity-80"
          aria-expanded={false}
          aria-controls={navId}
          aria-label="Open menu"
        >
          Menu
        </button>
      )}

      <main
        className={`flex min-h-0 flex-1 flex-col overflow-auto ${!expanded ? "pt-14" : ""}`}
      >
        {children}
      </main>
    </div>
  );
}
