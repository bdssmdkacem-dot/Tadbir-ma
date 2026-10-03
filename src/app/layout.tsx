import type { Metadata, Viewport } from "next";
import { generateMetadata, generateViewport } from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";
import { LazyCookie } from "@/components/common/Cookie";
import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";
import "@/app/globals.css";

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteStructuredData()) }} />
        <ScrollLayout>
          <AdaptiveGrid />
          <ReducedMotion />
          <LazyCookie />
          {children}
        </ScrollLayout>
      </body>
    </html>
  );
}
