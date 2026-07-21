import { Resend } from 'resend';
import type { ContactFormData } from './validation';

const OWNER_EMAIL = process.env.EMAIL_TO || 'info@altek-pro.com';
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Altek Pro <info@altek-pro.com>';
const PHONE_DISPLAY = '(949) 383-6108';
const PHONE_LINK = '+19493836108';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY is missing. Add it to your environment variables.',
    );
  }

  return new Resend(apiKey);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function sendConfirmationEmail(data: ContactFormData) {
  const resend = getResendClient();

  const name = escapeHtml(data.name);
  const email = data.email;
  const city = escapeHtml(data.city);
  const description = escapeHtml(data.description).replaceAll(
    '\n',
    '<br />',
  );

  const confirmationHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
          }

          .header {
            background: linear-gradient(
              135deg,
              #e68130 0%,
              #f7641a 100%
            );
            color: #ffffff;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }

          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }

          .message {
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #e68130;
          }

          .contact-box {
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
          }

          .contact-item {
            margin: 10px 0;
          }

          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666666;
          }

          a {
            color: #e68130;
          }
        </style>
      </head>

      <body>
        <div class="header">
          <h1 style="margin: 0;">Thank you, ${name}!</h1>

          <p style="margin: 10px 0 0; opacity: 0.9;">
            We received your request
          </p>
        </div>

        <div class="content">
          <div class="message">
            <p style="margin-top: 0;">
              Thank you for contacting <strong>Altek Pro</strong>.
            </p>

            <p>
              We received your service request for
              <strong>${city}</strong>.
            </p>

            <p style="margin-bottom: 0;">
              <strong>Your project description:</strong><br />
              ${description}
            </p>
          </div>

          <div class="message">
            <p style="margin-top: 0;">
              <strong>What happens next?</strong>
            </p>

            <p style="margin-bottom: 0;">
              We will review your project details and contact you soon
              to discuss the work and provide an estimate.
            </p>
          </div>

          <div class="contact-box">
            <p
              style="
                margin-top: 0;
                font-weight: bold;
                color: #e68130;
              "
            >
              Need immediate assistance?
            </p>

            <div class="contact-item">
              <strong>Call:</strong>
              <a href="tel:${PHONE_LINK}">
                ${PHONE_DISPLAY}
              </a>
            </div>

            <div class="contact-item">
              <strong>Email:</strong>
              <a href="mailto:info@altek-pro.com">
                info@altek-pro.com
              </a>
            </div>

            <div class="contact-item">
              <strong>Hours:</strong>
              Monday–Sunday, 8:00 AM–8:00 PM
            </div>
          </div>
        </div>

        <div class="footer">
          <p>
            <strong>Altek Pro LLC</strong> — Reliable. Skilled. Local.
          </p>

          <p>Handyman services in Orange County, California</p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thank you for contacting Altek Pro',
      html: confirmationHtml,
      replyTo: OWNER_EMAIL,
    });

    if (error) {
      console.error('Confirmation email error:', error);
      throw new Error('Failed to send confirmation email.');
    }

    return result;
  } catch (error) {
    console.error('Confirmation email service error:', error);
    throw error;
  }
}

export async function sendContactEmail(data: ContactFormData) {
  const resend = getResendClient();

  const name = escapeHtml(data.name);
  const phone = escapeHtml(data.phone);
  const email = data.email;
  const city = escapeHtml(data.city);
  const description = escapeHtml(data.description).replaceAll(
    '\n',
    '<br />',
  );
  const photos = data.photos ?? [];

  const photosHtml =
    photos.length > 0
      ? `
        <div class="field">
          <div class="label">
            Project photos (${photos.length})
          </div>

          <div class="value">
            ${photos
              .map(
                (url, index) => `
                  <div style="margin-bottom: 14px;">
                    <a
                      href="${url}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View project photo ${index + 1}
                    </a>

                    <div style="margin-top: 8px;">
                      <img
                        src="${url}"
                        alt="Project photo ${index + 1}"
                        style="
                          display: block;
                          width: 100%;
                          max-width: 520px;
                          height: auto;
                          border-radius: 8px;
                        "
                      />
                    </div>
                  </div>
                `,
              )
              .join('')}
          </div>
        </div>
      `
      : '';

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
          }

          .header {
            background: linear-gradient(
              135deg,
              #e68130 0%,
              #f7641a 100%
            );
            color: #ffffff;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }

          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }

          .field {
            margin-bottom: 20px;
          }

          .label {
            font-weight: bold;
            color: #e68130;
            margin-bottom: 5px;
          }

          .value {
            background: #ffffff;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #e68130;
            overflow-wrap: anywhere;
          }

          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666666;
          }

          a {
            color: #e68130;
          }
        </style>
      </head>

      <body>
        <div class="header">
          <h1 style="margin: 0;">New job request</h1>

          <p style="margin: 10px 0 0; opacity: 0.9;">
            Altek Pro LLC
          </p>
        </div>

        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>

          <div class="field">
            <div class="label">Phone</div>

            <div class="value">
              <a href="tel:${phone}">${phone}</a>
            </div>
          </div>

          <div class="field">
            <div class="label">Email</div>

            <div class="value">
              <a href="mailto:${email}">${email}</a>
            </div>
          </div>

          <div class="field">
            <div class="label">City</div>
            <div class="value">${city}</div>
          </div>

          <div class="field">
            <div class="label">Project description</div>
            <div class="value">${description}</div>
          </div>

          ${photosHtml}
        </div>

        <div class="footer">
          <p>
            This message was sent from the Altek Pro website contact
            form.
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New job request from ${name} — ${city}`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error('Resend owner email error:', error);
      throw new Error('Failed to send owner notification email.');
    }

    return result;
  } catch (error) {
    console.error('Owner email service error:', error);
    throw error;
  }
}