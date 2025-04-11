import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NotificationProvider } from "@/components/notification-provider";
import { NotificationCenter } from "@/components/ui/notification-center";
import PlanCountdown from "@/components/dashboard/plan-countdown";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocSystem - Gestão de Documentos",
  description: "Sistema de gestão de documentos e contratos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mock data - would be replaced with actual API data
  const userPlan = {
    name: "Gratuito",
    daysRemaining: 0,
    isPlanFree: true,
  };

  // For demo purposes, uncomment to show a paid plan
  // const userPlan = {
  //   name: "Profissional",
  //   daysRemaining: 20,
  //   isPlanFree: false,
  // };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <Script src="https://api.tempo.new/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <NotificationProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="relative">
              <header className="sticky top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-40 py-4 px-6 md:ml-64">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <PlanCountdown
                      planName={userPlan.name}
                      daysRemaining={userPlan.daysRemaining}
                      isPlanFree={userPlan.isPlanFree}
                      showDaysRemaining={true}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <NotificationCenter />
                  </div>
                </div>
              </header>
              <div className="pt-20">{children}</div>
              <Toaster />
              <TempoInit />
            </div>
          </ThemeProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
