"use client";

import ContactForm from "@/components/forms/ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/80 px-4 pb-14 pt-8 sm:px-5 sm:pb-20 sm:pt-10 lg:px-6 lg:pb-24 lg:pt-12"
    >
      <div className="relative z-10 mx-auto max-w-[800px]">
        {/* Section heading */}
        <div className="mb-7 text-center sm:mb-9">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-600 sm:text-sm">
            Get Started
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Request a Job
          </h2>
        </div>

        {/* Form card */}
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-5 shadow-[0_28px_80px_rgba(15,23,42,0.09),0_8px_24px_rgba(15,23,42,0.04)] sm:p-8 lg:p-10">
          {/* Subtle top highlight */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

          {/* Very soft inner light */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-50/60 to-transparent" />

          <div className="relative z-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}