import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart-provider";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Shree Fashion | Everyday Indian Wear", template: "%s | Shree Fashion" }, description: "Discover elegant ladies' clothing at Shree Fashion." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider><SiteHeader /><main>{children}</main><SiteFooter /></CartProvider></body></html>;
}
