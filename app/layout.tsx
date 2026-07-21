import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://altek-pro.com"),

  title: {
    default: "Altek Pro LLC | Local Handyman in Orange County, CA",
    template: "%s | Altek Pro",
  },

  description:
    "Professional handyman services in Orange County, California. Licensed and insured. Drywall repair, painting, installations, home repairs and more.",

  keywords: [
    "handyman",
    "Orange County handyman",
    "Irvine handyman",
    "home repair",
    "drywall repair",
    "interior painting",
    "door repair",
    "TV mounting",
    "furniture assembly",
    "bathroom repairs",
    "Orange County",
    "Irvine",
  ],

  authors: [{ name: "Altek Pro LLC" }],
  creator: "Altek Pro LLC",
  publisher: "Altek Pro LLC",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Altek Pro",
    title: "Altek Pro LLC | Local Handyman Services",
    description:
      "Professional drywall and handyman services throughout Orange County, California.",
    images: [
      {
        url: "/images/logo.svg",
        alt: "Altek Pro LLC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Altek Pro LLC | Local Handyman Services",
    description:
      "Professional drywall and handyman services throughout Orange County, California.",
    images: ["/images/logo.svg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <Header />

        {children}

        <Footer />

        <Analytics />
      </body>
    </html>
  );
}