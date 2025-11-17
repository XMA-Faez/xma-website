import { Theme } from "@radix-ui/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@radix-ui/themes/styles.css";
import "./globals.css";

import Footer from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { GlobalAnalyticsProvider } from "@/components/tracking/GlobalAnalyticsProvider";

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
  metadataBase: new URL("https://www.xma.ae"),
  title: "XMA Agency",
  description: "XMA Agency is a digital marketing agency.",
  appleWebApp: {
    title: "XMA Agency",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      {
        url: "/logos/xma/SVG/Logo Light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logos/xma/SVG/Logo Dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="b4Ruz4qrwE5l_HVaxaP5_Nysz4MGIQaCWg8xYkKrJcM"
        />
        {/* Favicon with light/dark mode support */}
        <link
          rel="icon"
          href="/logos/xma/SVG/Logo Light.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/logos/xma/SVG/Logo Dark.svg"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Theme grayColor="gray" hasBackground={false} radius="full">
            <QueryProvider>
              <PostHogProvider>
                <GlobalAnalyticsProvider>
                  {/* <AnimatedCursorComponent /> */}
                  <Header />
                  <SpeedInsights />
                  <main className="bg-slate-50 dark:bg-zinc-950">{children}</main>
                  <Analytics />
                  <Footer />
                </GlobalAnalyticsProvider>
              </PostHogProvider>
            </QueryProvider>
            <style>
              {`
              .dark,
              .dark-theme,
              :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {
                --color-background: #080808;
              }
            `}
            </style>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
