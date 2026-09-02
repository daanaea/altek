'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validation';
import { cities } from '@/lib/cities-data';
import Button from '@/components/ui/Button';

const OTHER_CITY_VALUE = 'Other / Not listed';
const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const [selectedCity, setSelectedCity] = useState('');
  const [customCity, setCustomCity] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      description: '',
    },
  });

  const handleCityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;

    setSelectedCity(value);
    setErrorMessage('');
    clearErrors('city');

    if (value === OTHER_CITY_VALUE) {
      setCustomCity('');
      setValue('city', '', {
        shouldValidate: false,
        shouldDirty: true,
      });

      return;
    }

    setCustomCity('');
    setValue('city', value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCustomCityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setCustomCity(value);
    clearErrors('city');

    setValue('city', value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const selectedFiles = Array.from(files);

    if (uploadedPhotos.length + selectedFiles.length > MAX_PHOTOS) {
      setErrorMessage(`You can upload up to ${MAX_PHOTOS} photos.`);
      event.target.value = '';
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file) => file.size > MAX_FILE_SIZE,
    );

    if (oversizedFile) {
      setErrorMessage(
        `"${oversizedFile.name}" is larger than 10 MB. Please choose a smaller file.`,
      );
      event.target.value = '';
      return;
    }

    setUploadingPhotos(true);
    setErrorMessage('');

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorResponse = await response.json().catch(() => null);

          throw new Error(
            errorResponse?.error || `Failed to upload "${file.name}".`,
          );
        }

        const result = await response.json();

        if (!result.url) {
          throw new Error(`No image URL was returned for "${file.name}".`);
        }

        return result.url as string;
      });

      const urls = await Promise.all(uploadPromises);

      setUploadedPhotos((currentPhotos) => [
        ...currentPhotos,
        ...urls,
      ]);
    } catch (error) {
      console.error('Upload error:', error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to upload photos. Please try again.',
      );
    } finally {
      setUploadingPhotos(false);
      event.target.value = '';
    }
  };

  const removePhoto = (url: string) => {
    setUploadedPhotos((currentPhotos) =>
      currentPhotos.filter((photo) => photo !== url),
    );

    setErrorMessage('');
  };

  const onSubmit = async (data: ContactFormData) => {
    if (selectedCity === OTHER_CITY_VALUE && !customCity.trim()) {
      setErrorMessage('Please enter your city.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const submissionData = {
        ...data,
        city:
          selectedCity === OTHER_CITY_VALUE
            ? customCity.trim()
            : data.city,
        photos: uploadedPhotos,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');

      reset();
      setSelectedCity('');
      setCustomCity('');
      setUploadedPhotos([]);

            if (typeof window !== 'undefined') {
        const gtag = (
          window as unknown as {
            gtag?: (
              command: string,
              eventName: string,
              parameters?: Record<string, string | number>,
            ) => void;
          }
        ).gtag;

        if (typeof gtag === 'function') {
          gtag('event', 'form_submission', {
            event_category: 'engagement',
            event_label: 'contact_form',
          });

          gtag('event', 'conversion', {
            send_to: 'AW-17999843147/3ydGCKSfjqgcEMue_4ZD',
            value: 1.0,
            currency: 'USD',
          });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);

      setStatus('error');
      setErrorMessage(
        'Something went wrong. Please try again or call us directly.',
      );
    }
  };

  const fieldClassName = (hasError: boolean) =>
    [
      'w-full rounded-xl border bg-white px-4 py-3.5',
      'text-base text-slate-900 placeholder:text-slate-400',
      'outline-none transition duration-200',
      'hover:border-slate-400',
      'focus:border-orange-500 focus:ring-4 focus:ring-orange-100',
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
        : 'border-slate-300',
    ].join(' ');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 sm:space-y-6"
      suppressHydrationWarning
      noValidate
    >
      <input type="hidden" {...register('city')} />

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Name <span className="text-orange-600">*</span>
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register('name')}
          className={fieldClassName(Boolean(errors.name))}
          placeholder="Your full name"
          aria-invalid={Boolean(errors.name)}
        />

        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Phone <span className="text-orange-600">*</span>
          </label>

          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...register('phone')}
            className={fieldClassName(Boolean(errors.phone))}
            placeholder="(949) 555-5555"
            aria-invalid={Boolean(errors.phone)}
          />

          {errors.phone && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Email <span className="text-orange-600">*</span>
          </label>

          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            {...register('email')}
            className={fieldClassName(Boolean(errors.email))}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
          />

          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="city-select"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          City <span className="text-orange-600">*</span>
        </label>

        <div className="relative">
          <select
            id="city-select"
            value={selectedCity}
            onChange={handleCityChange}
            className={`${fieldClassName(
              Boolean(errors.city),
            )} cursor-pointer appearance-none pr-12`}
            aria-invalid={Boolean(errors.city)}
          >
            <option value="">Select your city</option>

            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}

            <option value={OTHER_CITY_VALUE}>
              {OTHER_CITY_VALUE}
            </option>
          </select>

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m6 9 6 6 6-6"
            />
          </svg>
        </div>

        {errors.city && selectedCity !== OTHER_CITY_VALUE && (
          <p className="mt-1.5 text-sm text-red-600">
            {errors.city.message}
          </p>
        )}
      </div>

      {selectedCity === OTHER_CITY_VALUE && (
        <div className="animate-[fadeIn_200ms_ease-out]">
          <label
            htmlFor="custom-city"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Your city <span className="text-orange-600">*</span>
          </label>

          <input
            id="custom-city"
            type="text"
            value={customCity}
            onChange={handleCustomCityChange}
            autoComplete="address-level2"
            className={fieldClassName(
              Boolean(errors.city) || Boolean(errorMessage),
            )}
            placeholder="Enter your city"
          />

          {errors.city && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.city.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Project description{' '}
          <span className="text-orange-600">*</span>
        </label>

        <textarea
          id="description"
          rows={5}
          {...register('description')}
          className={`${fieldClassName(
            Boolean(errors.description),
          )} min-h-36 resize-y`}
          placeholder="Tell us about your project..."
          aria-invalid={Boolean(errors.description)}
        />

        {errors.description && (
          <p className="mt-1.5 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <label
            htmlFor="photo-upload"
            className="block text-sm font-semibold text-slate-800"
          >
            Project photos{' '}
            <span className="font-normal text-slate-500">
              (Optional)
            </span>
          </label>

          <span className="text-xs text-slate-500">
            {uploadedPhotos.length}/{MAX_PHOTOS} uploaded
          </span>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-4 transition-colors hover:border-slate-400 sm:p-5">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-slate-700">
                Add photos of the project area
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Up to 5 photos · 10 MB each
              </p>
            </div>

            <label
              htmlFor="photo-upload"
              className={[
                'inline-flex min-h-11 items-center justify-center gap-2',
                'rounded-xl border border-slate-300 bg-white px-4 py-2.5',
                'text-sm font-semibold text-slate-700 shadow-sm',
                'transition duration-200',
                uploadingPhotos || uploadedPhotos.length >= MAX_PHOTOS
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700',
              ].join(' ')}
            >
              {uploadingPhotos ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}

              <span>
                {uploadingPhotos ? 'Uploading...' : 'Add Photos'}
              </span>
            </label>
          </div>

          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            disabled={
              uploadingPhotos ||
              uploadedPhotos.length >= MAX_PHOTOS
            }
            className="sr-only"
          />
        </div>

        {uploadedPhotos.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {uploadedPhotos.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
              >
                <img
                  src={url}
                  alt={`Project upload ${index + 1}`}
                  className="h-32 w-full object-cover sm:h-36"
                />

                <button
                  type="button"
                  onClick={() => removePhoto(url)}
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-md transition hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                  aria-label={`Remove photo ${index + 1}`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {errorMessage && status !== 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        </div>
      )}

      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'loading' || uploadingPhotos}
          className="min-h-14 w-full rounded-xl bg-orange-500 font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-[0_14px_30px_rgba(249,115,22,0.3)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending...' : 'Request a Job'}
        </Button>
      </div>

      {status === 'success' && (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              ✓
            </span>

            <div>
              <p className="font-semibold text-emerald-900">
                Thank you for your request!
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                We received your project details and will be in
                touch soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-4"
        >
          <p className="font-semibold text-red-900">
            We couldn&apos;t send your request.
          </p>

          <p className="mt-1 text-sm text-red-700">
            {errorMessage}
          </p>
        </div>
      )}
    </form>
  );
}