"use client";

import { useState } from "react";
import blobUrls from "@/lib/blob-urls.json";

const urlMap = blobUrls as Record<string, string>;

function getBlobUrl(localPath: string): string {
  return urlMap[localPath] || localPath;
}

const services = [
  {
    title: "Drywall Repair & Patchwork",
    description: "Clean drywall repairs, patching, and smooth wall finishing",
    image: "/images/services/drywall-repair-patchwork.webp",
    alt: "Drywall repair and patchwork",
    galleryHref: "/gallery/drywall-repair-patchwork",
    items: [
      "Wall patching",
      "Ceiling repair",
      "Texture matching",
      "Crack repair",
      "Smooth finishing",
    ],
  },
  {
    title: "Interior Painting",
    description:
      "Professional interior painting with clean lines and even coverage",
    image: "/images/services/interior-painting.webp",
    alt: "Interior painting service",
    galleryHref: "/gallery/interior-painting",
    items: [
      "Walls",
      "Ceilings",
      "Trim and baseboards",
      "Touch-ups",
      "Accent walls",
    ],
  },
  {
    title: "Door Repair & Installation",
    description:
      "Door repairs, adjustments, and new door installation done right",
    image: "/images/services/door-repair-installation.webp",
    alt: "Door repair and installation",
    galleryHref: "/gallery/door-repair-installation",
    items: [
      "Door installation",
      "Door adjustments",
      "Handle and lock replacement",
      "Hinge repair",
      "Weatherstripping",
    ],
  },
  {
    title: "Bathroom Repairs & Caulking",
    description:
      "Bathroom repairs, caulking, and detail work for a clean finish",
    image: "/images/services/bathroom-repairs-caulking.webp",
    alt: "Bathroom repairs and caulking",
    galleryHref: "/gallery/bathroom-repairs-caulking",
    items: [
      "Tub and shower caulking",
      "Sealant replacement",
      "Fixture touch-ups",
      "Minor bathroom repairs",
      "Finish detailing",
    ],
  },
  {
    title: "Exterior Wood Repair & Restoration",
    description:
      "Damaged exterior wood repaired, restored and finished for lasting protection",
    image: getBlobUrl("/images/gallery/exterior-wood-repair-restoration/cover.png"),
    alt: "Exterior wood repair and restoration",
    galleryHref: "/gallery/exterior-wood-repair-restoration",
    items: [
      "Wood rot repair",
      "Exterior trim restoration",
      "Wood filler repairs",
      "Surface preparation",
      "Priming and painting",
    ],
  },
  {
    title: "General Handyman Repairs",
    description:
      "Reliable help with everyday repairs, fixes, and home improvements",
    image: "/images/services/general-handyman-repairs.webp",
    alt: "General handyman repairs",
    galleryHref: "/gallery/general-handyman-repairs",
    items: [
      "Minor home repairs",
      "TV and wall mounting",
      "Mailbox installation",
      "Hardware replacement",
      "Fixture installation",
    ],
  },
  {
    title: "Furniture Assembly & Installations",
    description:
      "Careful furniture assembly and installation for homes and offices",
    image: "/images/services/furniture-assembly-installations.webp",
    alt: "Furniture assembly and installations",
    galleryHref: "/gallery/general-handyman-repairs",
    items: [
      "Bed assembly",
      "Cabinet assembly",
      "Desk assembly",
      "Shelf installation",
      "Office furniture setup",
    ],
  },
  {
    title: "Outdoor Projects",
    description:
      "Outdoor repairs and upgrades built for function, durability, and curb appeal",
    image: "/images/services/outdoor-projects.webp",
    alt: "Outdoor projects and improvements",
    galleryHref: "/gallery/outdoor-projects",
    items: [
      "Fence work",
      "Pergola projects",
      "Gate repairs",
      "Exterior touch-ups",
      "Outdoor upgrades",
    ],
  },
];

export default function ServicesSection() {
  const [openCards, setOpenCards] = useState<string[]>([]);

  const toggleCard = (title: string) => {
    setOpenCards((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  return (
    <section
      id="services"
      className="bg-[#f8f8f6] pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-10"
    >
      <div className="mx-auto max-w-[1680px] px-4 sm:px-5 lg:px-6 xl:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[16px] font-bold uppercase tracking-[0.32em] text-orange-500 sm:text-[19px]">
            Services
          </p>

          <h2 className="mt-4 font-bold tracking-tight text-slate-900">
            <span className="block text-[36px] leading-[1.08] sm:hidden">
              Quality work.
              <br />
              Beautiful results.
              <br />
              Every time
            </span>

            <span className="hidden text-5xl leading-[1.08] sm:block xl:text-[56px]">
              Quality work. Beautiful results. Every time
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-7 text-slate-600 sm:text-lg">
            Reliable drywall, painting and handyman services delivered with
            attention to every detail
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-8 grid items-start gap-6 sm:grid-cols-2 lg:mt-9 xl:grid-cols-4">
          {services.map((service) => {
            const isOpen = openCards.includes(service.title);

            const contentId = `service-${service.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <article
                key={service.title}
                className="group overflow-hidden rounded-[26px] border border-slate-200/90 bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Service image */}
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 xl:aspect-[5/4]">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Service content */}
                <div className="p-5">
                  <h3 className="text-[18px] font-bold leading-[1.25] text-slate-900 sm:text-[19px] xl:min-h-[48px]">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 text-[16px] leading-7 text-slate-700 xl:min-h-[84px]">
                    {service.description}
                  </p>

                  <div className="mt-4 flex items-stretch gap-3">
                    <a
                      href={service.galleryHref}
                      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-orange-500 px-4 py-3.5 text-center text-[15px] font-semibold text-white shadow-sm transition duration-200 hover:bg-orange-600 hover:shadow-md"
                    >
                      View Projects
                    </a>

                    <button
                      type="button"
                      onClick={() => toggleCard(service.title)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-3.5 text-center text-[15px] font-semibold text-slate-700 transition duration-200 hover:border-slate-400 hover:bg-slate-50"
                    >
                      <span>See what’s included</span>

                      <span
                        aria-hidden="true"
                        className={`text-[17px] leading-none text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>
                  </div>

                  <div
                    id={contentId}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "mt-5 grid-rows-[1fr]"
                        : "mt-0 grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-2.5 border-t border-slate-200 pt-5 text-[15px] leading-6 text-slate-700">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}