import type React from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query-provider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/page-transition";
import { ReactFlowProvider } from "@xyflow/react";
import { Analytics } from "@vercel/analytics/next";

// Use only Google Fonts to avoid any local font references
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "SemantiPay",
  description: "AI-powered payroll management for modern businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased font-light",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Suspense>
              <PageTransition>
                <ReactQueryProvider>
                  <ReactFlowProvider>
                    <div className="flex-1">{children}</div>
                  </ReactFlowProvider>
                </ReactQueryProvider>
              </PageTransition>
            </Suspense>
          </div>
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
