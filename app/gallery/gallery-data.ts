import blobUrls from "@/lib/blob-urls.json";

export type GalleryCategoryMeta = {
  title: string;
  description: string;
  order: number;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
};

export type GalleryCategory = {
  slug: string;
  title: string;
  description: string;
  order: number;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  coverImage: string | null;
  images: string[];
};

const categoryMeta: Record<string, GalleryCategoryMeta> = {
  "drywall-repair-patchwork": {
    title: "Drywall Repair & Patchwork",
    description:
      "Seamless wall and ceiling repairs with clean texture blending",
    order: 1,
    heroTitleLine1: "Drywall Repair &",
    heroTitleLine2: "Patchwork",
    heroSubtitle: "Seamless repairs. Crisp walls",
  },

  "interior-painting": {
    title: "Interior Painting",
    description:
      "Smooth, even finishes for walls, ceilings, trim and living spaces",
    order: 2,
    heroTitleLine1: "Interior",
    heroTitleLine2: "Painting",
    heroSubtitle: "Smooth coats. Crisp lines",
  },

  "exterior-painting": {
    title: "Exterior Painting",
    description:
      "Durable exterior painting for siding, trim and outdoor surfaces",
    order: 3,
    heroTitleLine1: "Exterior",
    heroTitleLine2: "Painting",
    heroSubtitle: "Fresh color. Lasting finish",
  },

  "exterior-wood-repair-restoration": {
    title: "Exterior Wood Repair & Restoration",
    description:
      "Professional repair and restoration of damaged exterior wood",
    order: 4,
    heroTitleLine1: "Exterior Wood Repair &",
    heroTitleLine2: "Restoration",
    heroSubtitle: "Repair damage. Restore the finish",
  },

  "roof-repair-skylight-installation": {
    title: "Roof Repair & Skylight Installation",
    description:
      "Roof repairs, tile work and carefully finished skylight installations",
    order: 5,
    heroTitleLine1: "Roof Repair & Skylight",
    heroTitleLine2: "Installation",
    heroSubtitle: "Reliable repairs. Weather-ready results",
  },

  "door-repair-installation": {
    title: "Door Repair & Installation",
    description:
      "Door repairs, hardware updates and clean installations",
    order: 6,
    heroTitleLine1: "Door Repair &",
    heroTitleLine2: "Installation",
    heroSubtitle: "Smooth fit. Solid finish",
  },

  "bathroom-repairs-caulking": {
    title: "Bathroom Repairs & Caulking",
    description:
      "Clean bathroom repairs, resealing and finishing details",
    order: 7,
    heroTitleLine1: "Bathroom Repairs &",
    heroTitleLine2: "Caulking",
    heroSubtitle: "Clean seals. Crisp finish",
  },

  "kitchen-updates-cabinet-refinishing": {
    title: "Kitchen Updates & Cabinet Refinishing",
    description:
      "Cabinet refinishing and kitchen updates with polished results",
    order: 8,
    heroTitleLine1: "Kitchen Updates & Cabinet",
    heroTitleLine2: "Refinishing",
    heroSubtitle: "Fresh look. Crisp finish",
  },

  "furniture-assembly-installation": {
    title: "Furniture Assembly & Installation",
    description:
      "Careful furniture assembly and installation for homes and offices",
    order: 9,
    heroTitleLine1: "Furniture Assembly &",
    heroTitleLine2: "Installation",
    heroSubtitle: "Built carefully. Set up right",
  },

  "tv-mounting-wall-installations": {
    title: "TV Mounting & Wall Installations",
    description:
      "Secure TV mounting and clean installation of wall-mounted items",
    order: 10,
    heroTitleLine1: "TV Mounting & Wall",
    heroTitleLine2: "Installations",
    heroSubtitle: "Secure mounting. Clean alignment",
  },

  "general-handyman-repairs": {
    title: "General Handyman Repairs",
    description:
      "Everyday home repairs, maintenance and practical installations",
    order: 11,
    heroTitleLine1: "General Handyman",
    heroTitleLine2: "Repairs",
    heroSubtitle: "Done right. Built to last",
  },

  "outdoor-projects": {
    title: "Outdoor Projects",
    description:
      "Pergolas, fences, gates and functional backyard improvements",
    order: 12,
    heroTitleLine1: "Outdoor",
    heroTitleLine2: "Projects",
    heroSubtitle: "Built clean. Made to last",
  },
};

const urlMap = blobUrls as Record<string, string>;

const supportedImageExtensions = [
  ".webp",
  ".avif",
  ".jpg",
  ".jpeg",
  ".png",
];

function isSupportedImage(key: string) {
  const normalizedKey = key.toLowerCase();

  return supportedImageExtensions.some((extension) =>
    normalizedKey.endsWith(extension),
  );
}

function isCoverFile(key: string) {
  const fileName = key.split("/").pop() ?? "";
  const nameWithoutExtension =
    fileName.slice(0, fileName.lastIndexOf(".")) || fileName;

  return nameWithoutExtension.toLowerCase() === "cover";
}

function getCategoryEntries(slug: string) {
  const prefix = `/images/gallery/${slug}/`;

  return Object.entries(urlMap)
    .filter(
      ([key]) =>
        key.startsWith(prefix) &&
        isSupportedImage(key),
    )
    .map(([key, url]) => ({
      key,
      url,
    }));
}

export async function getGalleryCategories(): Promise<
  GalleryCategory[]
> {
  const categories = Object.entries(categoryMeta)
    .map(([slug, meta]) => {
      const categoryEntries = getCategoryEntries(slug);

      const coverEntry = categoryEntries.find(({ key }) =>
        isCoverFile(key),
      );

      const images = categoryEntries
        .filter(({ key }) => !isCoverFile(key))
        .sort((a, b) =>
          a.key.localeCompare(b.key, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        )
        .map(({ url }) => url);

      return {
        slug,
        title: meta.title,
        description: meta.description,
        order: meta.order,
        heroTitleLine1: meta.heroTitleLine1,
        heroTitleLine2: meta.heroTitleLine2,
        heroSubtitle: meta.heroSubtitle,
        coverImage: coverEntry?.url ?? null,
        images,
      };
    })
    .filter(
      (category) =>
        category.coverImage !== null ||
        category.images.length > 0,
    );

  return categories.sort((a, b) => a.order - b.order);
}

export async function getGalleryCategoryBySlug(
  slug: string,
): Promise<GalleryCategory | null> {
  if (!Object.prototype.hasOwnProperty.call(categoryMeta, slug)) {
    return null;
  }

  const categories = await getGalleryCategories();

  return (
    categories.find((category) => category.slug === slug) ??
    null
  );
}