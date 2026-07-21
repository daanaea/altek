import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGalleryCategories,
  getGalleryCategoryBySlug,
} from "../gallery-data";
import LightboxGallery from "./LightboxGallery";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const categories = await getGalleryCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getGalleryCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Project Gallery",
    };
  }

  return {
    title: category.title,
    description: `${category.description}. View completed Altek Pro projects throughout Orange County, California.`,
    alternates: {
      canonical: `/gallery/${category.slug}`,
    },
    openGraph: {
      title: `${category.title} | Altek Pro`,
      description: category.description,
      url: `/gallery/${category.slug}`,
      images: category.coverImage
        ? [
            {
              url: category.coverImage,
              alt: category.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function GalleryCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getGalleryCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pt-32 lg:px-8">
      <div className="mb-8">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:shadow-md"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            ←
          </span>

          <span>Back to gallery</span>
        </Link>
      </div>

      <section className="mb-10 overflow-hidden rounded-[32px] bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            {category.coverImage ? (
              <Image
                src={category.coverImage}
                alt={category.title}
                fill
                priority
                fetchPriority="high"
                quality={80}
                className="object-cover"
                sizes="(max-width: 1023px) calc(100vw - 32px), 680px"
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center bg-slate-100 text-slate-400">
                No cover image
              </div>
            )}
          </div>

          <div className="flex items-center bg-slate-50 px-8 py-10 md:px-10 lg:px-12">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
                Project Category
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {category.title}
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {category.images.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center text-slate-500">
          No gallery images found in this folder yet.
        </div>
      ) : (
        <LightboxGallery
          images={category.images}
          categoryTitle={category.title}
        />
      )}
    </main>
  );
}