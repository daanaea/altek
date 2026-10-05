## Altek Pro

[v0] Minimal working website for Yelp registration.

[v1] Updated. Added Vercel Pro sub.
- gallery, link reviews from Google Maps
- set up Google Ads
- Vercel Web Analytics with custom events

### Analytics Events (v1)

Custom events tracked via Vercel Analytics (`@vercel/analytics`):

| Event | Properties | Description |
|-------|------------|-------------|
| `call_click` | `location`: `header` \| `hero` \| `service_area` \| `contact` | Fired when a phone link is clicked |
| `request_job_click` | `location`: `header` \| `hero` \| `service_area` | Fired when a CTA button leading to the contact form is clicked |
| `request_job_submit` | — | Fired after a successful form submission |

No PII or sensitive data is collected. Events track user interactions only.

Resend for email routing to info@altek-pro.com (Zoho mailbox).
Vercel for deployment.
Cloudflare for domain hosting.
[Google Sheet](https://docs.google.com/spreadsheets/d/1dW6j3DAtDVnf5wSLsdaE9HibJH2RGduhW3oqum02Ols/edit?usp=sharing) for keeping records.
