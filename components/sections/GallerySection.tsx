'use client';

import Image from 'next/image';

export default function GallerySection() {
  // Real project photos
  const galleryItems = [
    { id: 1, image: 'WhatsApp Image 2026-01-07 at 18.51.07.jpeg', title: 'Project 1' },
    { id: 2, image: 'WhatsApp Image 2026-01-07 at 18.51.09.jpeg', title: 'Project 2' },
    { id: 3, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (1).jpeg', title: 'Project 3' },
    { id: 4, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (2).jpeg', title: 'Project 4' },
    { id: 5, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (3).jpeg', title: 'Project 5' },
    { id: 6, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (4).jpeg', title: 'Project 6' },
    { id: 7, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (5).jpeg', title: 'Project 7' },
    { id: 8, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (6).jpeg', title: 'Project 8' },
    { id: 9, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (7).jpeg', title: 'Project 9' },
    { id: 10, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (8).jpeg', title: 'Project 10' },
    { id: 11, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (9).jpeg', title: 'Project 11' },
    { id: 12, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (10).jpeg', title: 'Project 12' },
    { id: 13, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (11).jpeg', title: 'Project 13' },
    { id: 14, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (12).jpeg', title: 'Project 14' },
    { id: 15, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (13).jpeg', title: 'Project 15' },
    { id: 16, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (14).jpeg', title: 'Project 16' },
    { id: 17, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (15).jpeg', title: 'Project 17' },
    { id: 18, image: 'WhatsApp Image 2026-01-07 at 18.51.09 (16).jpeg', title: 'Project 18' },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-center">
          Past Projects
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Quality work we&apos;re proud of
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors group relative"
            >
              <Image
                src={`/images/gallery/${item.image}`}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Show more link */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Showing 18 of 46 projects
        </p>
      </div>
    </section>
  );
}
