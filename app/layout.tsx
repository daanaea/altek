import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Altek Pro LLC | Local Handyman in Orange County, CA",
  description: "Professional handyman services in Orange County. Licensed and insured. Specializing in assembly, painting, plumbing, electrical, and more. Local Handyman. Professional Results.",
  keywords: ["handyman", "Orange County", "home repair", "professional services", "assembly", "painting", "plumbing", "electrical", "HVAC", "carpentry", "drywall", "flooring"],
  authors: [{ name: "Altek Pro LLC" }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Altek Pro LLC | Local Handyman Services",
    description: "Local Handyman. Professional Results. Serving Orange County, California.",
    images: ["/images/logo.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altek Pro LLC | Local Handyman Services",
    description: "Local Handyman. Professional Results.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
