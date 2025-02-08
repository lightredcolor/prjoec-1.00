"use client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";

const manifestUrl = "https://github.com/lightredcolor/project-1.00/blob/main/metadata.json";

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
