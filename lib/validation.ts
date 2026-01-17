import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string()
    .regex(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Please enter a valid phone number'
    ),
  email: z.string().email('Please enter a valid email address'),
  city: z.string().min(2, 'Please select a city'),
  description: z.string()
    .min(10, 'Please provide at least 10 characters')
    .max(500, 'Description is too long (max 500 characters)'),
  photos: z.array(z.string().url()).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
