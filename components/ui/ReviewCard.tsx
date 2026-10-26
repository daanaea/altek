"use client";

import { FcGoogle } from "react-icons/fc";
import type { GoogleReview } from "@/lib/google-places";
import StarRating from "@/components/ui/StarRating";

interface ReviewCardProps {
  review: GoogleReview;
  googleMapsUri: string;
}

export default function ReviewCard({ review, googleMapsUri }: ReviewCardProps) {
  return (
    <a
      href={googleMapsUri}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        relative
        flex
        min-w-[300px]
        max-w-[340px]
        flex-shrink-0
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
        cursor-pointer
        active:scale-[0.99]
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
          <FcGoogle className="h-[15px] w-[15px]" aria-hidden="true" />
          <span>Google</span>
        </span>
      </div>

      {/* Review text */}
      <p className="relative z-10 mt-3.5 flex-1 text-[15px] leading-[1.55] text-slate-700">
        {review.text?.text || ""}
      </p>

      {/* Customer details */}
      <div className="relative z-10 mt-4 border-t border-slate-200 pt-3.5">
        <p className="text-base font-semibold leading-tight text-slate-900">
          {review.authorAttribution?.displayName || "Customer"}
        </p>

        <p className="mt-1 text-[13px] leading-5 text-slate-500">
          {review.relativePublishTimeDescription}
        </p>
      </div>
    </a>
  );
}
