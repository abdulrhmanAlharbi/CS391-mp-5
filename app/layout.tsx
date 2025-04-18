import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const quicksand = Quicksand({
    variable: "--font-quicksand",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "URL shortener",
  description: "Shorten a long URL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${quicksand.className} antialiased`}
        >
        <Header/>
        {children}
        </body>
        </html>
    );
}
