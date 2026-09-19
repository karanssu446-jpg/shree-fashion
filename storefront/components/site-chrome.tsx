"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingSocialLinks } from "@/components/floating-social-links";
import { AdminHeader } from "@/components/admin-header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <AdminHeader />
        <main className="admin-main">{children}</main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingSocialLinks />
    </>
  );
}
