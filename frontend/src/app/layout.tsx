import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "300", "500"]
});

const roboto = Roboto({
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Buy flow",
  description: "A mordern and relayable online shop",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
