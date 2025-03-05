import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import '@/lib/fontawesome'

const vazir = Vazirmatn({ subsets: ["arabic"]});


export const metadata: Metadata = {
  title: "Real Estate KhooneRah",
  description: "فروش و اجاره املاک سنترال ایران",
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
        <Providers> 
        {children}
        </Providers>
      </body>
    </html>
  );
}
