import { Resend } from 'resend';
import { ContactFormData } from './validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  const { name, phone, email, city, description } = data;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #4317C2 0%, #5316FF 100%);
            color: white;
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
            color: #4317C2;
            margin-bottom: 5px;
          }
          .value {
            background: white;
            padding: 10px;
            border-radius: 5px;
            border-left: 3px solid #4317C2;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">New Quote Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Altek Pro LLC</p>
        </div>

        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>

          <div class="field">
            <div class="label">Phone</div>
            <div class="value"><a href="tel:${phone}">${phone}</a></div>
          </div>

          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>

          <div class="field">
            <div class="label">City</div>
            <div class="value">${city}</div>
          </div>

          <div class="field">
            <div class="label">Project Description</div>
            <div class="value">${description}</div>
          </div>
        </div>

        <div class="footer">
          <p>This email was sent from your Altek Pro website contact form.</p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data: result, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@altekpro.com',
      to: process.env.EMAIL_TO || 'owner@altekpro.com',
      subject: `New Quote Request from ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}
