import { Resend } from 'resend';
import { ContactFormData } from './validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(data: ContactFormData) {
  const { name, email, city, description } = data;

  const confirmationHtml = `
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
            background: linear-gradient(135deg, #E68130 0%, #F7641A 100%);
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
          .message {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #E68130;
          }
          .contact-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .contact-item {
            margin: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
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
          <h1 style="margin: 0;">Thank You, ${name}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your request</p>
        </div>

        <div class="content">
          <div class="message">
            <p style="margin-top: 0;">Thank you for contacting <strong>Altek Pro</strong>!</p>
            <p>We've received your request for service in <strong>${city}</strong>.</p>
            <p style="margin-bottom: 0;"><strong>Your project description:</strong><br>${description}</p>
          </div>

          <div class="message">
            <p style="margin-top: 0;"><strong>What happens next?</strong></p>
            <p>We'll review your project details and contact you <strong>within 24 hours</strong> (usually much sooner!) to discuss your needs and provide a quote.</p>
          </div>

          <div class="contact-box">
            <p style="margin-top: 0; font-weight: bold; color: #E68130;">Need immediate assistance?</p>
            <div class="contact-item">
              <span>📞</span>
              <span><strong>Call us:</strong> <a href="tel:3412382682" style="color: #E68130;">(341) 238-2682</a></span>
            </div>
            <div class="contact-item">
              <span>✉️</span>
              <span><strong>Email:</strong> <a href="mailto:info@altek-pro.com" style="color: #E68130;">info@altek-pro.com</a></span>
            </div>
            <div class="contact-item">
              <span>⏰</span>
              <span><strong>Hours:</strong> Monday-Sunday, 8:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Altek Pro LLC</strong> - Reliable. Skilled. Local.</p>
          <p>Your go-to handyman in Orange County</p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Altek Pro <info@altek-pro.com>',
      to: email,
      subject: 'Thank you for contacting Altek Pro',
      html: confirmationHtml,
      replyTo: 'info@altek-pro.com',
    });

    if (error) {
      console.error('Confirmation email error:', error);
      throw new Error('Failed to send confirmation email');
    }

    return result;
  } catch (error) {
    console.error('Confirmation email service error:', error);
    throw error;
  }
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, phone, email, city, description, photos } = data;

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
            background: linear-gradient(135deg, #E68130 0%, #F7641A 100%);
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
            color: #E68130;
            margin-bottom: 5px;
          }
          .value {
            background: white;
            padding: 10px;
            border-radius: 5px;
            border-left: 3px solid #E68130;
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

          ${photos && photos.length > 0 ? `
          <div class="field">
            <div class="label">Attached Photos (${photos.length})</div>
            <div class="value">
              ${photos.map(url => `
                <div style="margin-bottom: 10px;">
                  <a href="${url}" target="_blank">
                    <img src="${url}" alt="Project photo" style="max-width: 100%; height: auto; border-radius: 5px; display: block;" />
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>

        <div class="footer">
          <p>This email was sent from your Altek Pro website contact form.</p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Altek Pro Website <info@altek-pro.com>',
      to: process.env.EMAIL_TO || 'info@altek-pro.com',
      subject: `New Job Request from ${name} - ${city}`,
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
