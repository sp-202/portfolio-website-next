import { ThemeWrapper } from "./theme-wrapper";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { GithubStatsProvider } from "@/context/GithubStatsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subhodeep Pal",
  description: "Portfolio app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeWrapper>
          <GithubStatsProvider>
            {children}
          </GithubStatsProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}