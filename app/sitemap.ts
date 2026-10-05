import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { galleryCategorySlugs } from '@/app/gallery/gallery-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const galleryPages = galleryCategorySlugs.map((slug) => ({
    url: `${SITE_URL}/gallery/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...galleryPages,
  ];
}
