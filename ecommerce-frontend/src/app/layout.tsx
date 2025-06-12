import React from "react";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Tienda de libros",
  description: "Tienda de libros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="w-full h-full">
      <body className="w-full h-full">
        {children}
      </body>
    </html>
  );
}
