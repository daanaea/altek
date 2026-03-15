'use client';

import Image from 'next/image';

export default function GallerySection() {
  // Real project photos
  const galleryItems = [
    { id: 1, image: 'й1.jpg', title: 'Exterior Painting' },
    { id: 2, image: 'painting9.jpeg', title: 'Interior Painting' },
    { id: 3, image: 'assembling2.jpeg', title: 'Furniture Assembly' },
    { id: 4, image: 'assembling3.jpg', title: 'Furniture Assembly' },
    { id: 5, image: 'assembling4.jpeg', title: 'Furniture Assembly' },
    { id: 6, image: 'painting3.jpeg', title: 'Interior Painting' },
    { id: 7, image: 'painting2.jpeg', title: 'Exterior Painting' },
    { id: 8, image: 'painting5.jpeg', title: 'Interior Painting' },
    { id: 9, image: 'roofing1.jpg', title: 'Roofing Repair' },
    { id: 10, image: 'tiling1.jpeg', title: 'Tiling' },
    { id: 11, image: 'assembling1.jpeg', title: 'Gate Installation' },
    { id: 12, image: 'painting8.jpeg', title: 'Interior Painting' },
    { id: 13, image: 'painting10.jpeg', title: 'Project Setup' },
    { id: 14, image: 'й2.jpg', title: 'Home Repair' },
    { id: 15, image: 'й3.jpg', title: 'Interior Painting' },
    { id: 16, image: 'й4.jpg', title: 'Interior Painting' },
    { id: 17, image: 'й5.jpg', title: 'Interior Painting' },
    { id: 18, image: 'й6.jpg', title: 'Plumbing Repair' },
    { id: 19, image: 'ф1.jpg', title: 'Water Damage Repair' },
    { id: 20, image: 'ф2.jpg', title: 'Water Damage Repair' },
    { id: 21, image: 'ф4.jpg', title: 'Water Damage Repair' },
    { id: 22, image: 'ф5.jpeg', title: 'Interior Painting' },
    { id: 23, image: 'ф6.jpeg', title: 'Interior Painting' },
    { id: 24, image: 'ф7.jpeg', title: 'Interior Painting' },
    { id: 25, image: 'ф8.jpeg', title: 'Interior Painting' },
    { id: 26, image: 'WhatsApp Image 2026-03-10 at 10.55.54.jpeg', title: 'Equipment Assembly' },
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">{item.id}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
