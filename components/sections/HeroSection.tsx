"use client";

import { getImageProps } from "next/image";
import type { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiYelp } from "react-icons/si";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    src: "/images/hero/hero-mobile.webp",
    alt: "",
    width: 900,
    height: 1400,
    sizes: "100vw",
    quality: 78,
  });

  const {
    props: { srcSet: desktopSrcSet, ...desktopImageProps },
  } = getImageProps({
    src: "/images/hero/hero-desktop.webp",
    alt: "",
    width: 1920,
    height: 1080,
    sizes: "100vw",
    quality: 80,
  });

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-[72px] sm:pt-20"
    >
      {/* Responsive optimized Hero background */}
      <picture
        className="absolute inset-0 block h-full w-full"
      >
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrcSet}
          sizes="100vw"
        />

        <source
          media="(min-width: 768px)"
          srcSet={desktopSrcSet}
          sizes="100vw"
        />

        <img
          {...desktopImageProps}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_2%] max-md:object-[center_10%]"
        />
      </picture>

      {/* Global photo toning */}
      <div className="absolute inset-0 bg-black/20 md:bg-black/[0.08]" />

      {/* Stronger text-side contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/[0.78] via-black/[0.42] to-black/[0.08] md:from-black/[0.72] md:via-black/[0.30] md:to-transparent lg:from-black/[0.70] lg:via-black/[0.25] lg:to-transparent" />

      {/* Upper vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/15 to-transparent" />

      {/* Depth behind content */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-[66%] bg-[radial-gradient(circle_at_28%_48%,rgba(15,47,95,0.14),transparent_62%)] md:block" />

      {/* Hero to Services transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-20 bg-gradient-to-b from-transparent via-[#f8f8f6]/18 to-[#f8f8f6] md:h-12 md:via-[#f8f8f6]/8 lg:h-10" />

      <div className="relative z-10 flex min-h-[calc(100svh-72px)] items-center px-6 sm:px-10 md:min-h-[760px] lg:px-12 xl:min-h-[800px] xl:px-16 2xl:px-20">
        <div className="w-full">
          <div className="max-w-[1030px] py-10 sm:py-12 lg:py-12">
            <h1 className="max-w-[960px] text-[41px] font-extrabold leading-[0.96] tracking-[-0.035em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.20)] min-[390px]:text-[43px] sm:text-[52px] md:text-[54px] lg:text-[59px] xl:text-[64px]">
              <span className="block md:hidden">
                Drywall &amp;
                <br />
                Handyman Services
              </span>

              <span className="hidden md:block">
                Drywall &amp; Handyman Services
              </span>

              <span className="mt-2.5 block text-[0.76em] leading-[1.02] tracking-[-0.025em] text-orange-500 sm:text-[0.8em]">
                in Orange County, CA
              </span>
            </h1>

            {/* Mobile and tablet tagline */}
            <p className="mt-5 text-[23px] font-medium leading-tight tracking-[-0.015em] text-white/95 sm:mt-6 sm:text-[29px] lg:hidden">
              Reliable. Skilled. Local
            </p>

            {/* Desktop tagline */}
            <div className="mt-6 hidden items-center gap-3.5 text-[30px] font-medium leading-tight tracking-[-0.018em] text-white/95 lg:flex">
              <span>Reliable</span>

              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-white/75"
                aria-hidden="true"
              />

              <span>Skilled</span>

              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-white/75"
                aria-hidden="true"
              />

              <span>Local</span>
            </div>

            {/* Main buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="tel:+19493836108"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-orange-400/40 bg-[#F97316] px-8 py-3 text-[17px] font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#EA580C] hover:shadow-[0_16px_36px_rgba(234,88,12,0.34)] sm:w-auto sm:min-w-[150px] sm:px-9 sm:py-3.5 sm:text-lg"
              >
                Call Now
              </a>

              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-[#0F2F5F] px-8 py-3 text-[17px] font-semibold text-white shadow-[0_12px_30px_rgba(3,16,38,0.30)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0B254A] hover:shadow-[0_16px_38px_rgba(3,16,38,0.38)] sm:w-auto sm:min-w-[210px] sm:px-9 sm:py-3.5 sm:text-lg"
              >
                Request Service
              </button>
            </div>

            {/* Mobile and tablet benefits */}
            <div className="mt-8 max-w-[960px] border-y border-white/20 bg-black/[0.06] py-5.5 backdrop-blur-[2px] sm:mt-9 lg:hidden">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-x-7">
                <BenefitItem icon={<ShieldIcon />} text="Licensed" />

                <BenefitItem
                  icon={<CheckIcon />}
                  text="Residential & Commercial"
                  regular
                />

                <BenefitItem
                  icon={<CheckIcon />}
                  text="Clean, Professional Work"
                  regular
                />
              </div>
            </div>

            {/* Desktop benefits */}
            <div className="mt-8 hidden max-w-[1000px] overflow-hidden rounded-[24px] border border-white/[0.28] bg-white/[0.12] px-6 py-[18px] shadow-[0_18px_55px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.20)] backdrop-blur-xl lg:block">
              <div className="grid grid-cols-3 items-center">
                <DesktopBenefitItem
                  icon={<ShieldIcon className="h-[22px] w-[22px]" />}
                  text="Licensed"
                />

                <DesktopBenefitItem
                  icon={<CheckIcon className="h-[22px] w-[22px]" />}
                  text="Residential & Commercial"
                  bordered
                />

                <DesktopBenefitItem
                  icon={<CheckIcon className="h-[22px] w-[22px]" />}
                  text="Clean, Professional Work"
                  bordered
                />
              </div>
            </div>

            {/* Information cards */}
            <div className="mt-8 grid max-w-[960px] grid-cols-2 gap-4 md:mt-10 md:grid-cols-4 md:gap-5 lg:max-w-[1000px] lg:gap-5 xl:gap-6">
              {/* Reviews */}
              <div className="group relative flex min-h-[196px] flex-col items-center justify-center overflow-hidden rounded-[25px] border border-white/[0.38] bg-white/[0.17] px-4 py-5 text-center shadow-[0_18px_48px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-xl transition duration-300 md:min-h-[208px] md:px-5 lg:min-h-[188px] lg:bg-white/[0.22] lg:hover:-translate-y-1.5 lg:hover:border-white/[0.48] lg:hover:bg-white/[0.27] lg:hover:shadow-[0_24px_60px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.28)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.10] to-transparent" />

                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-400/[0.10] blur-3xl transition duration-300 lg:group-hover:bg-orange-400/[0.16]" />

                {/* Mobile */}
                <div className="relative z-10 flex flex-col items-center justify-center md:hidden">
                  <p className="text-[17px] font-bold leading-tight text-white">
                    5-Star Reviews
                  </p>

                  <div
                    className="mt-3 flex justify-center gap-0.5 text-[22px] leading-none text-yellow-400 drop-shadow-sm"
                    aria-label="Five-star reviews"
                  >
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  <div className="mt-5 flex flex-col items-center justify-center gap-3">
                    <GoogleLink />
                    <YelpLink />
                  </div>
                </div>

                {/* Desktop */}
                <div className="relative z-10 hidden flex-col items-center justify-center md:flex">
                  <div
                    className="flex justify-center gap-1 text-[26px] leading-none text-yellow-400 drop-shadow-sm"
                    aria-label="Five-star reviews"
                  >
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  <p className="mt-3.5 text-[17px] font-bold leading-tight text-white">
                    5-Star Reviews
                  </p>

                  <div className="mt-4.5 flex items-center justify-center gap-4">
                    <GoogleLink />
                    <YelpLink />
                  </div>
                </div>
              </div>

              {/* Quality */}
              <div className="hidden md:block">
                <InfoCard>
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/75">
                      Quality
                    </p>

                    <div className="mt-5 flex flex-col items-center gap-4 lg:gap-3.5">
                      <DesktopCardItem
                        icon={<CheckIcon />}
                        text="Detail-Focused"
                        strong
                      />

                      <DesktopCardItem
                        icon={<CheckIcon />}
                        text="Built to Last"
                      />
                    </div>
                  </div>
                </InfoCard>
              </div>

              {/* Service */}
              <div className="hidden md:block">
                <InfoCard>
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/75">
                      Service
                    </p>

                    <div className="mt-5 flex flex-col items-center gap-4 lg:gap-3.5">
                      <DesktopCardItem
                        icon={<LightningIcon />}
                        text="Fast Response"
                        strong
                      />

                      <DesktopCardItem
                        icon={<CheckIcon />}
                        text="Free Estimates"
                      />
                    </div>
                  </div>
                </InfoCard>
              </div>

              {/* Coverage */}
              <InfoCard>
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/75">
                    Coverage
                  </p>

                  <div className="mt-3.5">
                    <LocationIcon />
                  </div>

                  <p className="mt-2.5 text-[17px] font-semibold leading-tight text-white md:text-[18px] lg:font-bold">
                    Orange County
                  </p>

                  <p className="mt-1.5 whitespace-nowrap text-[14px] font-medium leading-snug text-white/80 md:text-[15px]">
                    Homes &amp; Businesses
                  </p>
                </div>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type BenefitItemProps = {
  icon: ReactNode;
  text: string;
  regular?: boolean;
};

function BenefitItem({
  icon,
  text,
  regular = false,
}: BenefitItemProps) {
  return (
    <div className="flex items-center gap-3 text-white">
      {icon}

      <span
        className={`text-[18px] leading-tight sm:text-[18px] ${
          regular ? "font-medium" : "font-semibold"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

type DesktopBenefitItemProps = {
  icon: ReactNode;
  text: string;
  bordered?: boolean;
};

function DesktopBenefitItem({
  icon,
  text,
  bordered = false,
}: DesktopBenefitItemProps) {
  return (
    <div
      className={`flex min-h-11 items-center justify-center gap-3 px-5 text-center text-white ${
        bordered ? "border-l border-white/[0.24]" : ""
      }`}
    >
      {icon}

      <span className="text-[17px] font-semibold leading-tight tracking-[-0.01em]">
        {text}
      </span>
    </div>
  );
}

type InfoCardProps = {
  children: ReactNode;
};

function InfoCard({ children }: InfoCardProps) {
  return (
    <div className="group relative flex h-full min-h-[190px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/[0.26] bg-white/[0.10] px-4 py-5 text-center shadow-[0_14px_38px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-lg transition duration-300 md:min-h-[208px] md:px-5 lg:min-h-[188px] lg:bg-white/[0.15] lg:backdrop-blur-xl lg:hover:-translate-y-1 lg:hover:border-white/[0.36] lg:hover:bg-white/[0.20] lg:hover:shadow-[0_20px_50px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.20)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/[0.07] to-transparent" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

type DesktopCardItemProps = {
  icon: ReactNode;
  text: string;
  strong?: boolean;
};

function DesktopCardItem({
  icon,
  text,
  strong = false,
}: DesktopCardItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center text-white lg:flex-row lg:gap-2.5">
      {icon}

      <span
        className={`text-[16px] leading-tight md:text-[17px] ${
          strong ? "font-semibold" : "font-medium text-white/90"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

function GoogleLink() {
  return (
    <a
      href="https://share.google/pKDJh3REZerDGaR6T"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center justify-center gap-2 text-white transition duration-200 hover:text-white/80"
      aria-label="Open Altek Pro on Google"
    >
      <FcGoogle
        className="h-8 w-8 shrink-0 transition duration-200 group-hover:scale-110"
        aria-hidden="true"
      />

      <span className="text-[16px] font-semibold">Google</span>
    </a>
  );
}

function YelpLink() {
  return (
    <a
      href="https://www.yelp.com/biz/altek-pro-irvine"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center justify-center gap-2 text-white transition duration-200 hover:text-white/80"
      aria-label="Open Altek Pro on Yelp"
    >
      <SiYelp
        className="h-8 w-8 shrink-0 text-[#D32323] transition duration-200 group-hover:scale-110"
        aria-hidden="true"
      />

      <span className="text-[16px] font-semibold">Yelp</span>
    </a>
  );
}

function LightningIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`${className} shrink-0 text-white`}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
      />
    </svg>
  );
}

function ShieldIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`${className} shrink-0 text-white`}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4"
      />
    </svg>
  );
}

function CheckIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`${className} shrink-0 text-white/95`}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.415-1.42l2.293 2.294 6.493-6.494a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto h-7 w-7 shrink-0 text-orange-400 drop-shadow-[0_3px_10px_rgba(251,146,60,0.30)]"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.2 7-12a7 7 0 10-14 0c0 6.8 7 12 7 12z"
      />

      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}