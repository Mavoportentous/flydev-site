import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flydev.com.mx";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "FLYDEV",
  title: {
    default: "FLYDEV | Desarrollo web y servicios profesionales con drones",
    template: "%s | FLYDEV",
  },
  description:
    "Desarrollo web de alto impacto, e-commerce, PWAs, fotogrametría, inspección aérea y video corporativo 4K con drones.",
  keywords: [
    "FLYDEV",
    "Fly Dev",
    "desarrollo web",
    "desarrollo de software",
    "e-commerce",
    "PWA",
    "servicios con drones",
    "fotografía aérea",
    "fotogrametría",
    "inspección aérea",
    "video corporativo 4K",
    "agencia digital México",
  ],
  authors: [{ name: "FLYDEV" }],
  creator: "FLYDEV",
  publisher: "FLYDEV",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "FLYDEV",
    title: "FLYDEV | Desarrollo web y servicios profesionales con drones",
    description:
      "Soluciones digitales y aéreas para empresas: sitios web, tiendas online, PWAs, fotogrametría, inspección técnica y video 4K.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "FLYDEV | Desarrollo web y servicios profesionales con drones",
    description:
      "Desarrollo web de alto impacto y servicios profesionales con drones para empresas.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
