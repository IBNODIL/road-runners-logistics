import type { Metadata } from "next";
import { Albert_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const albert = Albert_Sans({ variable: "--font-albert", subsets: ["latin", "latin-ext"], weight: ["400", "500"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin", "latin-ext"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Road Runners Logistics SIA - Reliable Freight Transport",
  description:
    "Road Runners Logistics SIA helps businesses plan, transport and deliver cargo with reliable truck freight, warehousing, customs clearance and logistics management.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${albert.variable} ${jakarta.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
