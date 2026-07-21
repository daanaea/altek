"use client";

import { FcGoogle } from "react-icons/fc";
import { SiYelp } from "react-icons/si";
import StarRating from "@/components/ui/StarRating";

const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    rating: 5,
    text: "Altek Pro completed several projects around our home, including drywall repair, interior painting and backyard fence repair. Very skilled, professional and fairly priced.",
    service: "Drywall, Painting & Fence Repair",
    source: "Google",
  },
  {
    id: 2,
    name: "C. Edward Buffington",
    rating: 5,
    text: "Exceptional communication, quality workmanship and fair pricing. After using many handyman services over the years, Altek Pro truly stands out.",
    service: "Home Repairs & Improvements",
    source: "Google",
  },
  {
    id: 3,
    name: "Vivian Lutz Becker",
    rating: 5,
    text: "Knowledgeable, honest and professional. The work was clean, carefully completed and fairly priced, with every step clearly explained.",
    service: "General Handyman",
    source: "Google",
  },
  {
    id: 4,
    name: "Rohit J.",
    rating: 5,
    text: "Our home gym project included storage removal, mirrors, flooring, equipment assembly and lighting. Scheduling was easy, communication was excellent and the expanded scope was handled professionally.",
    service: "Complex Home Gym Installation",
    source: "Yelp",
  },
  {
    id: 5,
    name: "Michael D.",
    rating: 5,
    text: "Arrived on time and completed a challenging project with precision and excellent workmanship. Professional, courteous, well equipped and careful with cleanup.",
    service: "Complex Handyman Project",
    source: "Yelp",
  },
  {
    id: 6,
    name: "Regina S.",
    rating: 5,
    text: "Quick response, clear pricing and accurate custom work. Our bar stools were shortened neatly and additional outdoor fixtures were installed efficiently.",
    service: "Custom Repairs & Installation",
    source: "Yelp",
  },
];

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="bg-gray-50 px-4 pb-10 pt-6 sm:px-5 sm:pb-12 sm:pt-8 lg:px-6 lg:pb-10 lg:pt-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
            Customer Reviews
          </h2>

          {/* Rating and review platforms */}
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span
              className="text-[19px] leading-none tracking-[0.08em] text-amber-400 sm:text-[20px]"
              aria-label="Five-star customer reviews"
            >
              ★★★★★
            </span>

            <a
              href="https://share.google/pKDJh3REZerDGaR6T"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-slate-700 transition hover:text-slate-950"
              aria-label="View Altek Pro reviews on Google"
            >
              <FcGoogle
                className="h-5 w-5 transition duration-200 group-hover:scale-105"
                aria-hidden="true"
              />
              <span>Google</span>
            </a>

            <span className="text-sm text-slate-300" aria-hidden="true">
              •
            </span>

            <a
              href="https://www.yelp.com/biz/altek-pro-irvine"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-slate-700 transition hover:text-slate-950"
              aria-label="View Altek Pro reviews on Yelp"
            >
              <SiYelp
                className="h-5 w-5 text-[#D32323] transition duration-200 group-hover:scale-105"
                aria-hidden="true"
              />
              <span>Yelp</span>
            </a>
          </div>
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
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {reviews.map((review) => (
            <article
              key={review.id}
              className="
                group
                relative
                flex
                min-w-[86%]
                snap-center
                flex-col
                overflow-hidden
                rounded-[22px]
                border
                border-slate-200
                bg-white
                px-5
                py-5
                shadow-sm
                transition
                duration-300
                active:scale-[0.99]
                sm:min-w-0
                sm:snap-none
                sm:hover:-translate-y-1
                sm:hover:border-slate-300
                sm:hover:shadow-lg
              "
            >
              {/* Brand accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-orange-500" />

              {/* Rating and source */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <StarRating rating={review.rating} size="sm" />

                <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-slate-400">
                  {review.source === "Google" ? (
                    <FcGoogle
                      className="h-[15px] w-[15px]"
                      aria-hidden="true"
                    />
                  ) : (
                    <SiYelp
                      className="h-[15px] w-[15px] text-[#D32323]"
                      aria-hidden="true"
                    />
                  )}

                  <span>{review.source}</span>
                </span>
              </div>

              {/* Review text */}
              <p className="relative z-10 mt-3.5 flex-1 text-[15px] leading-[1.55] text-slate-700">
                {review.text}
              </p>

              {/* Customer details */}
              <div className="relative z-10 mt-4 border-t border-slate-200 pt-3.5">
                <p className="text-base font-semibold leading-tight text-slate-900">
                  {review.name}
                </p>

                <p className="mt-1 text-[13px] leading-5 text-slate-500">
                  {review.service}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile swipe indicator */}
        <div className="mt-1 flex items-center justify-center gap-2 sm:hidden">
          <span className="h-1.5 w-5 rounded-full bg-orange-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Closing line */}
        <div className="mt-4 text-center sm:mt-6">
          <p className="text-sm font-semibold tracking-wide text-slate-600">
            <span>Complex projects. Professional results.</span>

            <br className="sm:hidden" />

            <span className="mt-1 inline-block sm:mt-0 sm:inline">
              <span className="text-amber-400">★</span>
              <span className="ml-1 font-bold text-slate-900">
                5-Star Service
              </span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}