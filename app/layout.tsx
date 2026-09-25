import type { Metadata } from "next";
import { Bebas_Neue, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const stencil = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-stencil",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eaglewrench.com"),
  title: {
    default: "EagleWrench — Interactive Automotive Repair Education",
    template: "%s | EagleWrench",
  },
  description:
    "Learn automotive maintenance in a 3D garage bay. Educational demonstrations only — not a substitute for a service manual or a licensed technician.",
  keywords: [
    "oil change",
    "automotive education",
    "DIY car repair",
    "3D repair demo",
    "EagleWrench",
  ],
  openGraph: {
    title: "EagleWrench — Interactive Automotive Repair Education",
    description: "Phone-first 3D garage training. Educational only. Safety first.",
    url: "https://eaglewrench.com",
    siteName: "EagleWrench",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://eaglewrench.com" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${stencil.variable} ${body.variable}`}>
      <body className="font-body min-h-screen flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-garage-amber text-garage-950 px-3 py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
