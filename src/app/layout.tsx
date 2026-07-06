import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flipturn | Controllables outside the pool",
  description:
    "Track attendance, sleep, and meets. Find clues in your controllables — coaches still run the pool.",
  applicationName: "Flipturn",
  appleWebApp: {
    capable: true,
    title: "Flipturn",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f4c5c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f7f5f1] text-slate-800">{children}</body>
    </html>
  );
}
