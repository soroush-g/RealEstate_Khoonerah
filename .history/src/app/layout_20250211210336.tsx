import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ subset: ["arabic"]});


export const metadata: Metadata = {
  title: "Pishraft",
  description: "Generated by Tapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa-Ir" suppressHydrationWarning>
      <body
        className={vazir.className}
      >
        {children}
      </body>
    </html>
  );
}
