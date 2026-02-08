import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arbatai | Modern Lithuanian Tea",
  description: "Modern Lithuanian tea rituals, shipped fast from London.",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/boston-angel" />
      </head>
      <body>{children}</body>
    </html>
  );
}
