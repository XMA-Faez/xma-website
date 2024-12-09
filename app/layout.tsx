import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import Header from "@/components/layout/header/Header";

import AnimatedCursorComponent from "@/components/ui/AnimatedCursor";
import Footer from "@/components/layout/footer/Footer";

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
  title: "XMA Agency",
  description: "XMA Agency is a digital marketing agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme appearance="dark" grayColor="slate">
          {/* <AnimatedCursorComponent /> */}
          <Header />
          <main>{children}</main>
          <Footer />
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
      </body>
    </html>
  );
}
