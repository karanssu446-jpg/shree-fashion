import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Shree Fashion | Everyday Indian Wear", template: "%s | Shree Fashion" },
  description: "Discover elegant ladies' clothing at Shree Fashion.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Shree Fashion", title: "Shree Fashion | Everyday Indian Wear", description: "Discover elegant ladies' clothing at Shree Fashion.", url: siteUrl },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider><SiteHeader /><main>{children}</main><SiteFooter /></CartProvider></body></html>;
}
