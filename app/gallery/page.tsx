import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGalleryCategories } from "./gallery-data";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Explore completed drywall, painting, cabinet refinishing, repair and installation projects by Altek Pro throughout Orange County.",
  alternates: {
    canonical: "/gallery",
  },
};

const shortDescriptions: Record<string, string> = {
  "Bathroom Repairs & Caulking":
    "Bathroom repairs and precision caulking",

  "Door Repair & Installation":
    "Door repair, adjustments and installation",

  "Drywall Repair & Patchwork":
    "Seamless drywall repairs and patchwork",

  "Interior Painting":
    "Smooth, even interior painting",

  "Exterior Painting":
    "Durable exterior painting and finishing",

  "Kitchen Updates & Cabinet Refinishing":
    "Kitchen updates and cabinet refinishing",

  "TV Mounting & Wall Installations":
    "TV mounting and wall installations",

  "General Handyman Repairs":
    "Everyday home repairs and maintenance",

  "Outdoor Projects":
    "Outdoor repairs and property improvements",
};

export default async function GalleryPage() {
  const categories = await getGalleryCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 md:px-6 md:pt-28 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:shadow-md"
        >
          <span
            aria-hidden="true"
            className="text-base transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            ←
          </span>

          <span>Back to home</span>
        </Link>
      </div>

      {/* Page heading */}
      <section className="mb-9 max-w-5xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-orange-500">
          Our Work
        </p>

        <h1 className="text-[42px] font-bold leading-tight tracking-tight text-slate-900 md:text-[54px]">
          Project Gallery
        </h1>

        <p className="mt-4 max-w-[1050px] text-base leading-7 text-slate-600 md:text-lg">
          Browse completed drywall, painting, cabinet refinishing and handyman
          projects across Orange County
        </p>
      </section>

      {/* Gallery categories */}
      <section className="grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const description =
            shortDescriptions[category.title] ?? category.description;

          return (
            <Link
              key={category.slug}
              href={`/gallery/${category.slug}`}
              className="group overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Cover image */}
              <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
                {category.coverImage ? (
                  <Image
                    src={category.coverImage}
                    alt={category.title}
                    fill
                    quality={76}
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1279px) calc((100vw - 72px) / 2), 394px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    No cover image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Category text */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h2 className="text-[22px] font-bold leading-tight text-white md:text-2xl">
                    {category.title}
                  </h2>

                  <p className="mt-2 max-w-[95%] text-sm leading-6 text-white/90 md:text-[15px]">
                    {description}
                  </p>
                </div>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                  <PhotoIcon />

                  <span>
                    {category.images.length}{" "}
                    {category.images.length === 1 ? "photo" : "photos"}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 transition group-hover:text-orange-600">
                  View gallery

                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

function PhotoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0 text-slate-500"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />

      <circle cx="9" cy="10" r="1.5" />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 15l-4.5-4.5L9 18"
      />
    </svg>
  );
}