import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Readonly<Props>) {
  return (
    <section
      aria-labelledby="admin-title"
      className="flex min-h-[calc(100vh-var(--spacing)*13)] flex-col md:min-h-[calc(100vh-var(--spacing)*22)]"
    >
      <header className="shrink-0 border-b border-[#dbe5e5] bg-[linear-gradient(135deg,#ffffff_0%,#f4f8f6_58%,#eef4ef_100%)]">
        <div className="mx-auto flex max-w-5xl items-center gap-5 px-5 py-5 md:px-8 md:py-7">
          <div className="max-w-2xl">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-dark">
              Panel roboczy
            </p>
            <h1 id="admin-title" className="text-3xl md:text-4xl">
              Administracja
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brand-text md:text-base">
              Zarzadzaj zgłoszeniami tras i odznakami
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </section>
  );
}
