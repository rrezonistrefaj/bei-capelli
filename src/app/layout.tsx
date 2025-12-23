import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { getNavigationData } from "@/lib/api";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";
import type { NavigationData } from "@/types/strapi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bei Capelli",
  description: "Hair Saloon",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navigationData: NavigationData | null = null
  try {
    navigationData = await getNavigationData()
  } catch {
    navigationData = null
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <div className="fixed top-0 left-0 right-0 z-50">
          {navigationData ? (
            <Navbar navigationData={navigationData} />
          ) : (
            <header className="mx-auto flex max-w-[1265px] items-center justify-between px-4 py-4 xl:px-0 bg-white/80 backdrop-blur">
              <div className="h-7 w-28 bg-black/10" aria-hidden />
              <nav className="hidden xl:flex items-center gap-7 lg:gap-9">
                <span className="h-4 w-16 bg-black/10" aria-hidden />
                <span className="h-4 w-16 bg-black/10" aria-hidden />
                <span className="h-4 w-16 bg-black/10" aria-hidden />
              </nav>
              <div className="hidden xl:block h-9 w-28 bg-black/10" aria-hidden />
            </header>
          )}
        </div>

        <main>
          <ErrorBoundaryWrapper>
            {children}
          </ErrorBoundaryWrapper>
        </main>
      </body>
    </html>
  );
}
