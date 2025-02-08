"use client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";

const manifestUrl = "https://your-vercel-app-url.vercel.app/metadata.json";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TON connect Demo</title>
      </head>
      <body>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
