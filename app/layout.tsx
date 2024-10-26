import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { WatchlistProvider } from '../context/WatchlistContext';
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
  title: "Movie Watch list",
  description: "Movie Watch list using TMDB API",
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
        <AuthProvider>
          <WatchlistProvider>
            <div className="min-h-screen bg-white dark:bg-gray-800 transition-all duration-300">
              {children}
            </div>
          </WatchlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}