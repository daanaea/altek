# Altek Pro Landing Page - Deployment Guide

## 🎉 Your Website is Ready!

The development server is currently running at: **.,**

## ✅ What's Been Built

### Core Features
- ✅ Minimalistic, Notion-inspired design
- ✅ Mobile-first responsive layout
- ✅ 12 service categories with expandable accordions
- ✅ Contact form with email + Google Sheets integration
- ✅ Smooth animations (Framer Motion)
- ✅ SEO optimized (sitemap, robots.txt, metadata)
- ✅ Analytics ready (Vercel Analytics + Google Analytics 4)

### Page Sections
1. **Hero** - Brand, slogan, and CTA
2. **Services** - 12 categories with accordion details
3. **About** - Owner bio and trust indicators
4. **Service Areas** - 19+ Orange County cities
5. **Gallery** - Placeholder grid (ready for photos)
6. **Reviews** - Placeholder testimonials
7. **Contact** - Quote request form
8. **Footer** - Links and service areas

### Color Scheme
- Primary: `#4317C2` (purple from logo)
- Accent: `#5316FF`
- Grays: `#9C9E9F`, `#B1B1B1`, `#CFCFCF`

## 🚀 Next Steps: Deployment to Vercel

### 1. Set Up Required Services

#### A. Google Sheets Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Sheets API
4. Create service account credentials
5. Download the JSON credentials file
6. Create a Google Sheet with these headers:
   ```
   Timestamp | Name | Phone | Email | City | Description
   ```
7. Share the sheet with the service account email

#### B. Resend Email Setup
1. Sign up at [Resend](https://resend.com)
2. Add your domain (e.g., altekpro.com)
3. Add DNS records for email verification:
   - SPF record
   - DKIM record
   - DMARC record
4. Get your API key from the dashboard

### 2. Deploy to Vercel

#### A. Push to GitHub
```bash
git add .
git commit -m "Initial Altek Pro website"
git branch -M main
git remote add origin https://github.com/yourusername/altek-pro.git
git push -u origin main
```

#### B. Import to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Framework Preset: **Next.js** (auto-detected)
5. Root Directory: `./`

#### C. Add Environment Variables
In Vercel dashboard, add these environment variables:

```
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@altekpro.com
EMAIL_TO=owner@altekpro.com
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1abc123xyz
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important:** For `GOOGLE_SHEETS_PRIVATE_KEY`, make sure to:
- Keep the quotes around the entire key
- Include `\n` characters (they should be literal `\n`, not actual newlines)

#### D. Deploy
Click "Deploy" and wait for the build to complete (2-3 minutes)

### 3. Custom Domain Setup

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your domain (e.g., `altekpro.com` and `www.altekpro.com`)
3. Update DNS records at your domain registrar:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`

### 4. Post-Deployment Tasks

#### A. Test the Form
1. Visit your live site
2. Fill out and submit the contact form
3. Check:
   - ✅ Email received
   - ✅ Entry in Google Sheet
   - ✅ Success message displayed

#### B. Replace Placeholders
- **Gallery**: Add real project photos to `/public/images/gallery/`
- **Reviews**: Update placeholder reviews in `ReviewsSection.tsx`
- **About Photo**: Replace placeholder in `AboutSection.tsx`

#### C. Analytics Verification
- Verify Google Analytics is tracking (check Real-Time reports)
- Verify Vercel Analytics in dashboard

## 📁 Project Structure

```
altek/
├── app/                  # Next.js app directory
│   ├── api/contact/      # Form submission endpoint
│   ├── layout.tsx        # Root layout with Header/Footer
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles
│   ├── sitemap.ts        # SEO sitemap
│   └── robots.ts         # SEO robots.txt
├── components/
│   ├── forms/            # ContactForm
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── lib/
│   ├── services-data.ts  # 12 service categories
│   ├── cities-data.ts    # Orange County cities
│   ├── validation.ts     # Form validation
│   ├── email.ts          # Resend integration
│   └── google-sheets.ts  # Sheets API
├── public/images/
│   └── logo.svg          # Altek Pro logo
├── .env.local            # Environment variables (NOT in git)
└── package.json          # Dependencies
```

## 🛠️ Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Configuration Files

- `tailwind.config.ts` - Custom colors and theme
- `next.config.ts` - Image optimization settings
- `tsconfig.json` - TypeScript configuration

## 📝 Updating Content

### Services
Edit `/lib/services-data.ts` to add/remove/modify services

### Cities
Edit `/lib/cities-data.ts` to add/remove service areas

### Contact Form Fields
Edit `/lib/validation.ts` and `/components/forms/ContactForm.tsx`

## 🎨 Design System

### Colors
```css
--color-primary: #4317C2   /* Purple */
--color-accent: #5316FF    /* Bright purple */
--color-gray-100: #CFCFCF
--color-gray-200: #B1B1B1
--color-gray-300: #9C9E9F
```

### Typography
- Font: Inter (Google Font)
- Headings: Bold weights
- Body: Regular weight

### Components
- Buttons: Primary (purple), Secondary (outlined), Outline
- Cards: Hover effects with scale and shadow
- Accordions: Smooth height animations

## 📊 Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Mobile-friendly: 100%

## 🐛 Troubleshooting

### Build Errors
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Form Not Submitting
1. Check browser console for errors
2. Verify environment variables in Vercel
3. Check Resend and Google Sheets API status
4. View API logs in Vercel dashboard

### Styling Issues
1. Clear browser cache
2. Rebuild: `npm run build`
3. Check Tailwind config is correct

## 📞 Support

- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind Docs: https://tailwindcss.com/docs
- Resend Docs: https://resend.com/docs

## ✨ Future Enhancements

Consider adding:
- [ ] Real Google Maps integration
- [ ] Blog section for SEO
- [ ] Service detail pages
- [ ] Pricing calculator
- [ ] Online booking system
- [ ] Customer portal
- [ ] Live chat widget
- [ ] Before/After gallery comparison slider

---

**Your website is production-ready! Just configure the services and deploy.** 🚀
