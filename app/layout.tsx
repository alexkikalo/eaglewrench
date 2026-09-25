import type { Metadata } from "next";
import { Bebas_Neue, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

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
    default: "EagleWrench — Be Your Own Mechanic",
    template: "%s | EagleWrench",
  },
  description:
    "Stop monkeying around. Soar — be your own mechanic. 3D garage for oil, tires, wipers, and the rest of the list. Demonstration only.",
  keywords: [
    "oil change",
    "DIY car repair",
    "3D garage",
    "EagleWrench",
  ],
  openGraph: {
    title: "EagleWrench — Be Your Own Mechanic",
    description: "Stop monkeying around. Soar — be your own mechanic. 3D garage. Safety first.",
    url: "https://eaglewrench.com",
    siteName: "EagleWrench",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://eaglewrench.com" },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${stencil.variable} ${body.variable}`}>
      <body className="font-body min-h-screen flex flex-col antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-garage-amber text-garage-950 px-3 py-2">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
