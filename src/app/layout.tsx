"use client"

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Navbar from "@/components/Navbar";

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main className="mt-20">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
