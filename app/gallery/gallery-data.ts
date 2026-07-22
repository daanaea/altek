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

function isCoverFile(fileName: string) {
  const name = fileName.split("/").pop()?.split(".")[0]?.toLowerCase();
  return name === "cover";
}

function fallbackTitleFromSlug(slug: string) {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export async function getGalleryCategories(): Promise<
  GalleryCategory[]
> {
  // Extract unique slugs from URL keys
  const slugSet = new Set<string>();
  for (const key of Object.keys(urlMap)) {
    // key format: /images/gallery/{slug}/{file}
    const parts = key.split("/");
    if (parts.length >= 4) {
      slugSet.add(parts[3]);
    }
  }

  const categories = Array.from(slugSet).map((slug) => {
    // Get all URLs for this category
    const prefix = `/images/gallery/${slug}/`;
    const categoryUrls = Object.entries(urlMap)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, url]) => ({ key, url }));

    // Find cover image
    const coverEntry = categoryUrls.find(({ key }) => isCoverFile(key));
    const coverImage = coverEntry?.url ?? null;

    // Get all non-cover images, sorted
    const images = categoryUrls
      .filter(({ key }) => !isCoverFile(key))
      .sort((a, b) =>
        a.key.localeCompare(b.key, undefined, {
          numeric: true,
        }),
      )
      .map(({ url }) => url);

    const meta = categoryMeta[slug];

    return {
      slug,
      title: meta?.title ?? fallbackTitleFromSlug(slug),
      description:
        meta?.description ??
        "Project gallery and completed work examples",
      order: meta?.order ?? 999,
      heroTitleLine1:
        meta?.heroTitleLine1 ??
        fallbackTitleFromSlug(slug),
      heroTitleLine2: meta?.heroTitleLine2 ?? "",
      heroSubtitle:
        meta?.heroSubtitle ??
        "Clean work. Professional results",
      coverImage,
      images,
    };
  });

  return categories.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.title.localeCompare(b.title);
  });
}

export async function getGalleryCategoryBySlug(
  slug: string,
) {
  const categories = await getGalleryCategories();

  return (
    categories.find((item) => item.slug === slug) ??
    null
  );
}
