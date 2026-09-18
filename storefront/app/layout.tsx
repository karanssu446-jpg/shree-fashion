import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.shree-fashion.com"),
  title: { default: "Shree Fashion | Everyday Indian Wear", template: "%s | Shree Fashion" },
  description: "Discover elegant ladies' clothing at Shree Fashion.",
  icons: {
    icon: { url: "/favicon.webp", type: "image/webp" },
  },
  verification: { other: { "msvalidate.01": "5B7CB963C5E3D213D6C24F50D6918579" } },
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Shree Fashion", title: "Shree Fashion | Everyday Indian Wear", description: "Discover elegant ladies' clothing at Shree Fashion.", url: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider><SiteHeader /><main>{children}</main><SiteFooter /></CartProvider><Script async src="https://www.googletagmanager.com/gtag/js?id=G-0XHLXH8MW8" strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{"window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-0XHLXH8MW8');"}</Script></body></html>;
}
