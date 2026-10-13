import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Oswald, Inter } from "next/font/google";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout library and daily gym plan",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <PlanProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}