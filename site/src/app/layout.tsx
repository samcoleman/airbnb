import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Guest Portal",
  description: "Guest WiFi access portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-background text-foreground antialiased")}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
