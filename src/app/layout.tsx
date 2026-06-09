import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AnimatedBackground } from "@/components/animated-background";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Fitness | Advanced Insights & Recognition",
  description: "Experience the next generation of fitness tracking with real-time human activity recognition and premium analytics.",
  keywords: ["fitness", "activity recognition", "workout analysis", "health insights"],
  authors: [{ name: "Aura Labs" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased selection:bg-primary/20`}
      >
        <AnimatedBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
