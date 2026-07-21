import Link from "next/link";
import Image from "next/image";
import { getGalleryCategories } from "@/app/gallery/gallery-data";

const previewSlugs = [
  "drywall-repair-patchwork",
  "interior-painting",
  "door-repair-installation",
  "bathroom-repairs-caulking",
  "general-handyman-repairs",
  "outdoor-projects",
];

export default async function GalleryPreviewSection() {
  const categories = await getGalleryCategories();

  const previewItems = previewSlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter(
      (
        category,
      ): category is Awaited<
        ReturnType<typeof getGalleryCategories>
      >[number] => Boolean(category),
    );

  return (
    <section className="bg-[#f8f8f6] pb-8 pt-0 sm:pb-10 lg:pb-12">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-5 lg:px-6 xl:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[17px] font-bold uppercase tracking-[0.32em] text-orange-500 sm:text-[19px]">
            Our Work
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl xl:text-[56px] xl:leading-[1.05]">
            <span className="hidden xl:block">
              See the Quality for Yourself
            </span>

            <span className="xl:hidden">
              See the Quality
              <br />
              for Yourself
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Real projects, clean results and work built to last
          </p>
        </div>

        {/* Mobile carousel / desktop grid */}
        <div
          className="
            -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3
            scroll-smooth
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:mx-0
            sm:grid
            sm:grid-cols-2
            sm:gap-5
            sm:overflow-visible
            sm:px-0
            sm:pb-0
            sm:snap-none
            lg:mt-9
            xl:grid-cols-3
          "
        >
          {previewItems.map((item) => (
            <Link
              key={item.slug}
              href={`/gallery/${item.slug}`}
              className="
                group
                min-w-[86%]
                snap-center
                overflow-hidden
                rounded-[24px]
                border
                border-slate-200/90
                bg-white
                shadow-md
                transition
                duration-300
                active:scale-[0.99]
                sm:min-w-0
                sm:snap-none
                sm:hover:-translate-y-1.5
                sm:hover:shadow-xl
              "
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {item.coverImage ? (
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 ease-out sm:group-hover:scale-[1.045]"
                    sizes="(max-width: 640px) 86vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    No cover image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[17px] font-semibold leading-[1.22] text-white sm:text-[18px]">
                      {item.title}
                    </h3>

                    <span
                      aria-hidden="true"
                      className="
                        shrink-0
                        text-xl
                        text-white
                        opacity-80
                        transition
                        duration-300
                        sm:opacity-0
                        sm:group-hover:translate-x-1
                        sm:group-hover:opacity-100
                      "
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="mt-1 flex items-center justify-center gap-2 sm:hidden">
          <span className="h-1.5 w-5 rounded-full bg-orange-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Gallery button */}
        <div className="mt-8 text-center sm:mt-10">
          <Link
            href="/gallery"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
          >
            <span>View Full Gallery</span>

            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}