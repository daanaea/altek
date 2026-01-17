import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail, sendConfirmationEmail } from '@/lib/email';
import { appendToGoogleSheet } from '@/lib/google-sheets';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate data with Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Run email and sheets operations in parallel
    const results = await Promise.allSettled([
      sendContactEmail(data),
      sendConfirmationEmail(data),
      appendToGoogleSheet(data),
    ]);

    // Check if all operations succeeded
    const ownerEmailResult = results[0];
    const confirmationEmailResult = results[1];
    const sheetsResult = results[2];

    if (ownerEmailResult.status === 'rejected') {
      console.error('Owner email failed:', ownerEmailResult.reason);
    }

    if (confirmationEmailResult.status === 'rejected') {
      console.error('Confirmation email failed:', confirmationEmailResult.reason);
    }

    if (sheetsResult.status === 'rejected') {
      console.error('Sheets logging failed:', sheetsResult.reason);
    }

    // Return success if at least one email succeeded
    if (ownerEmailResult.status === 'fulfilled' || confirmationEmailResult.status === 'fulfilled') {
      return NextResponse.json(
        {
          success: true,
          message: 'Form submitted successfully',
        },
        { status: 200 }
      );
    } else {
      throw new Error('Both email operations failed');
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
