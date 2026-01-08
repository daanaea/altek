import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';
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
      appendToGoogleSheet(data),
    ]);

    // Check if both operations succeeded
    const emailResult = results[0];
    const sheetsResult = results[1];

    if (emailResult.status === 'rejected') {
      console.error('Email failed:', emailResult.reason);
    }

    if (sheetsResult.status === 'rejected') {
      console.error('Sheets logging failed:', sheetsResult.reason);
    }

    // Return success if at least one operation succeeded
    // (You might want to adjust this logic based on your requirements)
    if (emailResult.status === 'fulfilled' || sheetsResult.status === 'fulfilled') {
      return NextResponse.json(
        {
          success: true,
          message: 'Form submitted successfully',
        },
        { status: 200 }
      );
    } else {
      throw new Error('Both email and sheets operations failed');
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
