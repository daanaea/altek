"use client";

import { useState } from "react";

const serviceBenefits = [
  {
    title: "Homes & Businesses",
    description: "Residential and commercial projects",
    icon: <PropertyIcon />,
  },
  {
    title: "Clear Communication",
    description: "Clear updates from start to finish",
    icon: <CommunicationIcon />,
  },
  {
    title: "Attention to Detail",
    description: "Every project completed with care",
    icon: <ToolsIcon />,
  },
];

const featuredCities = [
  "Irvine",
  "Tustin",
  "Newport Beach",
  "Costa Mesa",
  "Lake Forest",
  "Mission Viejo",
  "Laguna Niguel",
  "Huntington Beach",
  "San Clemente",
];

const additionalCities = [
  "Laguna Hills",
  "Aliso Viejo",
  "Rancho Santa Margarita",
  "Fountain Valley",
  "Santa Ana",
  "Garden Grove",
  "Anaheim",
  "Orange",
  "Fullerton",
  "Laguna Beach",
  "Dana Point",
];

const contactItems = [
  {
    title: "Call or Text",
    value: "(949) 383-6108",
    href: "tel:+19493836108",
    icon: <PhoneIcon />,
  },
  {
    title: "Email",
    value: "info@altek-pro.com",
    href: "mailto:info@altek-pro.com",
    icon: <EmailIcon />,
  },
  {
    title: "Hours",
    value: "Mon–Sun, 8 AM–8 PM",
    href: null,
    icon: <ClockIcon />,
  },
];

export default function ServiceAreasSection() {
  const [showAllCities, setShowAllCities] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    window.location.hash = "contact";
  };

  return (
    <section
      id="service-areas"
      aria-labelledby="service-areas-title"
      className="relative overflow-hidden bg-[#f7f8fa] px-4 py-9 sm:px-5 sm:py-12 lg:px-6 lg:py-14"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 top-8 h-[320px] w-[320px] rounded-full bg-orange-300/10 blur-3xl sm:h-[340px] sm:w-[340px]" />

        <div className="absolute -left-40 bottom-0 h-[320px] w-[320px] rounded-full bg-blue-300/10 blur-3xl sm:h-[340px] sm:w-[340px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1380px]">
        {/* Section heading */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500 sm:text-sm">
            Service Area
          </p>

          <h2
            id="service-areas-title"
            className="mx-auto mt-3 max-w-[760px] text-[34px] font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-[40px] lg:max-w-none lg:whitespace-nowrap lg:text-[42px] xl:text-[46px]"
          >
            Handyman services across Orange County
          </h2>
        </div>

        {/* Main card */}
        <div className="mt-7 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_22px_64px_rgba(15,23,42,0.10)] sm:mt-9 sm:rounded-[32px]">
          <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
            {/* Left panel */}
            <div className="relative overflow-hidden bg-[#071a34] px-5 py-7 text-white sm:px-8 sm:py-9 lg:px-10 lg:py-10 xl:px-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-orange-500/20 blur-3xl sm:h-64 sm:w-64" />

                <div className="absolute -bottom-32 left-8 h-[272px] w-[272px] rounded-full bg-sky-500/10 blur-3xl sm:h-72 sm:w-72" />

                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <h3 className="max-w-xl text-[31px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[36px] lg:text-[38px] xl:text-[42px]">
                  Quality workmanship
                  <span className="block">from start to finish</span>
                </h3>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-[17px]">
                  Clear communication, careful work and dependable results
                </p>

                {/* Benefits */}
                <div className="mt-6 grid gap-2.5 sm:mt-7 sm:grid-cols-3 sm:gap-3">
                  {serviceBenefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="flex min-h-[82px] items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.09] px-4 py-3.5 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.13] sm:block sm:min-h-0 sm:p-3.5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 sm:h-9 sm:w-9">
                        {benefit.icon}
                      </div>

                      <div className="min-w-0 sm:mt-3">
                        <p className="text-sm font-bold leading-5 text-white">
                          {benefit.title}
                        </p>

                        <p className="mt-0.5 text-[13px] leading-5 text-white/55 sm:mt-1 sm:text-xs">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3 lg:mt-auto lg:pt-8">
                  <a
                    href="tel:+19493836108"
                    aria-label="Call or text Altek Pro at 949-383-6108"
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-base font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-[0_16px_32px_rgba(249,115,22,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a34] sm:w-auto"
                  >
                    <PhoneIcon small />
                    Call or Text
                  </a>

                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a34] sm:w-auto"
                  >
                    Get a Free Estimate
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="relative overflow-hidden bg-[#f7f2eb] px-5 py-7 sm:px-8 sm:py-9 lg:px-9 lg:py-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:34px_34px]" />

                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border-[32px] border-orange-200/35 sm:h-56 sm:w-56 sm:border-[34px]" />

                <div className="absolute -bottom-24 -left-20 h-52 w-52 rounded-full border-[28px] border-slate-300/30 sm:h-56 sm:w-56 sm:border-[30px]" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 sm:text-sm">
                      Service Coverage
                    </p>

                    <h3 className="mt-2 text-[32px] font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-[34px]">
                      Cities we serve
                    </h3>
                  </div>

                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-lg shadow-slate-900/10 sm:flex">
                    <LocationIcon />
                  </div>
                </div>

                {/* Featured cities */}
                <div className="mt-5 rounded-[22px] border border-white/80 bg-white/85 p-4 shadow-[0_14px_38px_rgba(15,23,42,0.08)] backdrop-blur-md sm:rounded-[24px] sm:p-5">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-2 xl:grid-cols-3">
                    {featuredCities.map((city) => (
                      <div
                        key={city}
                        className="flex min-w-0 items-start gap-2 text-[14px] font-semibold text-slate-700 sm:text-sm"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />

                        <span className="leading-5">{city}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expanded cities */}
                  <div
                    className={[
                      "grid overflow-hidden transition-all duration-300",
                      showAllCities
                        ? "mt-4 max-h-[500px] border-t border-slate-200 pt-4 opacity-100"
                        : "max-h-0 opacity-0",
                    ].join(" ")}
                  >
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-2 xl:grid-cols-3">
                      {additionalCities.map((city) => (
                        <div
                          key={city}
                          className="flex min-w-0 items-start gap-2 text-[14px] font-medium text-slate-600 sm:text-sm"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />

                          <span className="leading-5">{city}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAllCities((current) => !current)}
                    aria-expanded={showAllCities}
                    className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                  >
                    {showAllCities ? "Show fewer cities" : "View all cities"}

                    <span
                      className={[
                        "transition-transform duration-300",
                        showAllCities ? "rotate-180" : "",
                      ].join(" ")}
                    >
                      <ChevronIcon />
                    </span>
                  </button>
                </div>

                {/* Availability action */}
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="group mt-4 flex w-full items-center gap-2.5 border-t border-orange-200/70 px-0.5 pt-4 text-left transition duration-300 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <QuestionIcon />
                  </span>

                  <span className="min-w-0 flex-1 text-sm font-bold leading-5 text-slate-900 sm:hidden">
                    Don’t see your city? Check availability
                  </span>

                  <span className="hidden min-w-0 flex-1 sm:block">
                    <span className="block text-sm font-bold text-slate-900">
                      Don’t see your city?
                    </span>

                    <span className="mt-0.5 block text-sm leading-5 text-slate-600">
                      Check availability for your area
                    </span>
                  </span>

                  <span className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div className="grid border-t border-slate-200 bg-white sm:grid-cols-3">
            {contactItems.map((item, index) => {
              const content = (
                <>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition duration-300 group-hover:bg-orange-100">
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400 sm:text-[11px]">
                      {item.title}
                    </p>

                    <p
                      className={[
                        "mt-0.5 break-words font-bold leading-5 text-slate-900",
                        index === 0
                          ? "text-[15px] sm:text-base"
                          : "text-[14px] sm:text-sm",
                      ].join(" ")}
                    >
                      {item.value}
                    </p>
                  </div>
                </>
              );

              const itemClassName = [
                "group flex min-h-[68px] items-center gap-3 px-4 py-3 transition duration-300 hover:bg-slate-50 sm:min-h-[76px] sm:px-5 sm:py-3.5",
                index > 0
                  ? "border-t border-slate-200 sm:border-l sm:border-t-0"
                  : "",
              ]
                .filter(Boolean)
                .join(" ");

              if (item.href) {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className={itemClassName}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={item.title} className={itemClassName}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function PhoneIcon({ small = false }: { small?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={small ? "h-4 w-4" : "h-5 w-5"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M3.75 5.25A2.25 2.25 0 0 1 6 3h2.1a1.5 1.5 0 0 1 1.43 1.05l1.02 3.06a1.5 1.5 0 0 1-.56 1.7l-1.37.98a12.1 12.1 0 0 0 5.59 5.59l.98-1.37a1.5 1.5 0 0 1 1.7-.56l3.06 1.02A1.5 1.5 0 0 1 21 15.9V18a2.25 2.25 0 0 1-2.25 2.25h-.75C10.13 20.25 3.75 13.87 3.75 6v-.75Z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h12a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25V6.75Z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="m4.5 7.5 6.2 4.13a2.35 2.35 0 0 0 2.6 0L19.5 7.5"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"
      />

      <circle cx="12" cy="10" r="2.25" strokeWidth={1.8} />
    </svg>
  );
}

function PropertyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="m3.5 10.5 8.5-7 8.5 7M5.5 9v11h13V9M9.5 20v-6h5v6"
      />
    </svg>
  );
}

function CommunicationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M5.25 5.25h13.5A2.25 2.25 0 0 1 21 7.5v7.5a2.25 2.25 0 0 1-2.25 2.25H11l-4.5 3v-3H5.25A2.25 2.25 0 0 1 3 15V7.5a2.25 2.25 0 0 1 2.25-2.25Z"
      />

      <path
        strokeLinecap="round"
        strokeWidth={1.8}
        d="M7.5 9.25h9M7.5 13h6"
      />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.3 2.3-3-3 2.3-2.3Z"
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.9}
        d="M9.5 9a2.65 2.65 0 1 1 4.65 1.75c-.85.96-2.15 1.31-2.15 2.75"
      />

      <path strokeLinecap="round" strokeWidth={2} d="M12 17.25h.01" />

      <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m7 10 5 5 5-5"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.9}
        d="M5 12h14m-5-5 5 5-5 5"
      />
    </svg>
  );
}