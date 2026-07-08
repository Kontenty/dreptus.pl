"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    href: "/admin",
    label: "Uczestnicy tras",
    match: (pathname: string) => pathname === "/admin",
  },
  {
    href: "/admin/badges",
    label: "Odznaki",
    match: (pathname: string) => pathname.startsWith("/admin/badges"),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-none flex-col bg-gray-100 px-6">
      <div className="mx-4 mb-4 h-px bg-white/10" />

      <nav
        aria-label="Sekcje administracji"
        className="flex flex-col gap-1 flex-1 px-3"
      >
        {sections.map((section) => {
          const isActive = section.match(pathname);

          return (
            <Link
              key={section.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "rounded-xl px-6 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-white shadow-md shadow-stone-900/5"
                  : " text-gray-500 hover:bg-white/90",
              ].join(" ")}
              href={section.href}
            >
              <span>{section.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
