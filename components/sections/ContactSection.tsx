'use client';

import ContactForm from '@/components/forms/ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Request a Job
          </h2>
          <p className="text-gray-600">
            We&apos;ll respond within 24 hours
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
