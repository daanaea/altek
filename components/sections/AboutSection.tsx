'use client';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          About
        </h2>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Hi, my name is <strong>Al</strong>, and I&apos;m the owner of <strong>Altek Pro</strong>.
          </p>

          <p>
            I have a <strong>technical engineering background</strong> and hands-on
            experience working as a handyman. I approach every project with{' '}
            <strong>precision, planning, and attention to detail</strong>.
          </p>

          <p>
            I use <strong>professional-grade tools</strong> and proper installation
            methods to deliver clean, reliable results. Altek Pro proudly serves
            homeowners across <strong>Orange County, California</strong>, providing
            honest service and professional workmanship you can trust.
          </p>
        </div>
      </div>
    </section>
  );
}
