import type { Metadata } from "next";
import localFont from "next/font/local";
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
    title: "HxHdle - Classique",
    description: "Quiz about the anime Hunter x Hunter",
};

export default function RootLayout({
        children,
    }: Readonly<{
    children: React.ReactNode;
}>) {
  return (
      <html lang="fr" className="min-h-screen">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-background-home bg-cover bg-fixed bg-center min-h-screen`}
      >
      {children}
      </body>
      </html>
  );
}
