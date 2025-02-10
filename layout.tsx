"use client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";

const manifestUrl = "https://raw.githubusercontent.com/lightredcolor/project-1.00/refs/heads/main/metadata.json";

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
