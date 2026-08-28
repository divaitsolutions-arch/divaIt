import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/shared/config/site";
import { TopBar } from "@/shared/components/layout/TopBar";
import { Navigation } from "@/shared/components/layout/Navigation";
import { FooterSection } from "@/shared/components/layout/FooterSection";
import { BackToTop } from "@/shared/components/BackToTop";
import { WhatsAppWidget } from "@/shared/components/layout/WhatsAppWidget";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { HideOnStudio } from "@/shared/components/layout/HideOnStudio";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteConfig.name,
    card: "summary_large_image",
  },
  icons: {
    icon: "/shared/logo.png",
    apple: "/shared/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-paper text-ink transition-colors duration-300`}>
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-paper dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-[#1a102a] dark:via-[#05040a] dark:to-[#030208] transition-colors duration-300" aria-hidden="true">
          {/* Original subtle blue accent, now blends into both themes */}
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[80vh] w-[120vw] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06),transparent_70%)]" />
        </div>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <HideOnStudio>
            <TopBar />
            <Navigation />
          </HideOnStudio>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <HideOnStudio>
            <FooterSection />
            <WhatsAppWidget />
            <BackToTop />
          </HideOnStudio>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
