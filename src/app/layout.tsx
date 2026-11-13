import type { Metadata } from "next";
import Providers from "./providers";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";

const archivoFont = Archivo({
  subsets: ["latin"],
  display: "swap",
});
const poppinsFont = Manrope({
  subsets: ["latin"],
  variable: "--poppins-font",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Annuva Homes Realtors",
  description: "Annuva Homes Realtors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ ...archivoFont.style }}
        className={`${poppinsFont.variable} ${archivoFont.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
