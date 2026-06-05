import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Fly Dev',
    default: 'Fly Dev | Desarrollo Web y Servicios Aéreos con Drones',
  },
  description: 'Soluciones integrales para tu negocio. Expertos en diseño web, desarrollo de software a la medida y servicios aéreos profesionales con drones en México.',
  keywords: ['desarrollo web', 'servicios con drones', 'fotografía aérea', 'desarrollo de software', 'Next.js', 'agencia digital México', 'Fly Dev'],
  metadataBase: new URL('https://flydev.com.mx'),
  openGraph: {
    title: 'Fly Dev | Desarrollo Web y Drones',
    description: 'Llevamos tus ideas a las alturas. Soluciones digitales escalables y servicios aéreos profesionales.',
    url: 'https://flydev.com.mx',
    siteName: 'Fly Dev',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fly Dev | Innovación Digital y Aérea',
    description: 'Expertos en diseño web, software y servicios aéreos con drones.',
  },
}

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
