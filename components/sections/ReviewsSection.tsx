'use client';

import StarRating from '@/components/ui/StarRating';

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: 'Michael R.',
      rating: 5,
      text: 'Outstanding work! Al was professional, punctual, and did an excellent job installing our new ceiling fan and fixing electrical outlets. Highly recommend!',
      service: 'Electrical',
      date: '2 weeks ago',
    },
    {
      id: 2,
      name: 'Jennifer L.',
      rating: 5,
      text: 'Very impressed with the quality of work. The painting job looks flawless and he was very meticulous with the details. Will definitely hire again!',
      service: 'Interior Painting',
      date: '1 month ago',
    },
    {
      id: 3,
      name: 'David K.',
      rating: 5,
      text: 'Great experience from start to finish. Fixed our plumbing issue quickly and explained everything clearly. Fair pricing and honest service.',
      service: 'Plumbing',
      date: '3 weeks ago',
    },
    {
      id: 4,
      name: 'Sarah M.',
      rating: 5,
      text: 'Al helped us assemble all our IKEA furniture and mount our TV. Saved us so much time and frustration. Very professional and efficient!',
      service: 'Assembly & TV Mounting',
      date: '2 months ago',
    },
    {
      id: 5,
      name: 'Robert T.',
      rating: 5,
      text: 'Excellent carpentry work on our deck repair. The attention to detail and craftsmanship exceeded our expectations. Highly skilled!',
      service: 'Carpentry',
      date: '1 month ago',
    },
    {
      id: 6,
      name: 'Lisa H.',
      rating: 5,
      text: 'Prompt, professional, and friendly service. Fixed our drywall and did some painting. The results are perfect and he cleaned up everything after.',
      service: 'Drywall & Painting',
      date: '3 weeks ago',
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-center">
          Customer Reviews
        </h2>
        <p className="text-center text-gray-600 mb-12">
          What our clients say about our work
        </p>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors"
            >
              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={review.rating} size="sm" />
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                &quot;{review.text}&quot;
              </p>

              {/* Reviewer Info */}
              <div className="border-t border-gray-100 pt-4">
                <p className="font-medium text-gray-900 text-sm">{review.name}</p>
                <p className="text-xs text-gray-600 mt-1">{review.service}</p>
                <p className="text-xs text-gray-400 mt-1">{review.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Join our satisfied customers across Orange County
          </p>
        </div>
      </div>
    </section>
  );
}
