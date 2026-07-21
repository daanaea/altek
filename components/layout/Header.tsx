"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const goToSection = (sectionId: string) => {
    if (pathname === "/") {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    router.push(`/#${sectionId}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
            aria-label="Go to Altek Pro homepage"
          >
            <img
              src="/altek_pro_logo.svg"
              alt="Altek Pro"
              className="h-12 w-auto sm:h-14 lg:h-16"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            <button
              type="button"
              onClick={() => goToSection("services")}
              className="text-base font-medium text-slate-700 transition hover:text-slate-950"
            >
              Services
            </button>

            <Link
              href="/gallery"
              className="text-base font-medium text-slate-700 transition hover:text-slate-950"
            >
              Gallery
            </Link>

            <a
              href="tel:+19493836108"
              className="rounded-2xl border border-slate-300 px-5 py-2.5 text-lg font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              (949) 383 6108
            </a>

            <button
              type="button"
              onClick={() => goToSection("contact")}
              className="rounded-2xl bg-slate-950 px-6 py-2.5 text-lg font-semibold text-white transition hover:bg-slate-800"
            >
              Request a Job
            </button>
          </nav>

          {/* Mobile navigation */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/gallery"
              className="rounded-lg border border-slate-300 px-2.5 py-2 text-[13px] font-semibold text-slate-800 transition hover:bg-slate-50 min-[390px]:px-3 min-[390px]:text-sm"
            >
              Gallery
            </Link>

            <button
              type="button"
              onClick={() => goToSection("contact")}
              className="whitespace-nowrap rounded-lg bg-slate-950 px-2.5 py-2 text-[13px] font-semibold text-white transition hover:bg-slate-800 min-[390px]:px-3 min-[390px]:text-sm"
            >
              Request a Job
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}