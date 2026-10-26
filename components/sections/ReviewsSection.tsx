import { getGoogleReviews, GoogleReview } from "@/lib/google-places";
import { FcGoogle } from "react-icons/fc";
import { SiYelp } from "react-icons/si";
import ReviewCard from "@/components/ui/ReviewCard";

const YELP_URL = "https://www.yelp.com/biz/altek-pro-irvine";

export default async function ReviewsSection() {
  const placeDetails = await getGoogleReviews();

  // If API fails, show fallback with just rating badge and links
  if (!placeDetails) {
    return <ReviewsFallback />;
  }

  const { rating, userRatingCount, reviews, googleMapsUri } = placeDetails;

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

          {/* Rating */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5">
            <span
              className="text-[19px] leading-none tracking-[0.08em] text-amber-400 sm:text-[20px]"
              aria-label={`${rating} star rating`}
            >
              {renderStars(rating)}
            </span>
            <span className="text-sm font-medium text-slate-600">
              {rating.toFixed(1)} ({userRatingCount} reviews)
            </span>
          </div>

          {/* Review platform pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[14px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              aria-label="View all Altek Pro reviews on Google"
            >
              <FcGoogle
                className="h-5 w-5 transition duration-200 group-hover:scale-110"
                aria-hidden="true"
              />
              <span>Google Reviews</span>
            </a>

            <a
              href={YELP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[14px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              aria-label="View Altek Pro reviews on Yelp"
            >
              <SiYelp
                className="h-5 w-5 text-[#D32323] transition duration-200 group-hover:scale-110"
                aria-hidden="true"
              />
              <span>Yelp Reviews</span>
            </a>
          </div>
        </div>

        {/* Reviews carousel */}
        <div
          className="
            -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3
            scroll-smooth
            sm:-mx-5 sm:gap-5 sm:px-5
            lg:-mx-6 lg:gap-6 lg:px-6
          "
        >
          {reviews.slice(0, 6).map((review, index) => (
            <ReviewCard key={index} review={review} googleMapsUri={googleMapsUri} />
          ))}
        </div>

        {/* Mobile swipe indicator */}
        <div className="mt-1 flex items-center justify-center gap-2 sm:hidden">
          {reviews.slice(0, 6).map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full ${
                index === 0 ? "w-5 bg-orange-500" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Google attribution */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            Reviews powered by Google
          </p>
        </div>

        {/* Closing line */}
        <div className="mt-2 text-center sm:mt-4">
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

// Fallback component when API fails
function ReviewsFallback() {
  return (
    <section
      id="reviews"
      className="bg-gray-50 px-4 pb-10 pt-6 sm:px-5 sm:pb-12 sm:pt-8 lg:px-6 lg:pb-10 lg:pt-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
            Customer Reviews
          </h2>

          {/* Rating badge and links only */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <span
                className="text-lg leading-none tracking-[0.08em] text-amber-400"
                aria-label="Five-star rating"
              >
                ★★★★★
              </span>
              <span className="text-sm font-semibold text-slate-700">
                5.0 Rating
              </span>
            </div>

            <a
              href="https://share.google/pKDJh3REZerDGaR6T"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-semibold text-slate-700 shadow-sm transition hover:shadow-md"
              aria-label="View Altek Pro reviews on Google"
            >
              <FcGoogle
                className="h-5 w-5 transition duration-200 group-hover:scale-105"
                aria-hidden="true"
              />
              <span>Google Reviews</span>
            </a>

            <a
              href={YELP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-semibold text-slate-700 shadow-sm transition hover:shadow-md"
              aria-label="View Altek Pro reviews on Yelp"
            >
              <SiYelp
                className="h-5 w-5 text-[#D32323] transition duration-200 group-hover:scale-105"
                aria-hidden="true"
              />
              <span>Yelp Reviews</span>
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Read our customer reviews on Google and Yelp
          </p>
        </div>
      </div>
    </section>
  );
}

// Helper to render stars based on rating
function renderStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  let stars = "★".repeat(fullStars);
  if (hasHalf && fullStars < 5) {
    stars += "☆";
  }
  return stars.padEnd(5, "☆");
}
