import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { DemoDataProvider } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "ReviewPilot Demo",
  description: "Clickable MVP demo for review management orchestration"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DemoDataProvider>
          <AppShell>{children}</AppShell>
        </DemoDataProvider>
      </body>
    </html>
  );
}
