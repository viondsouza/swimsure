import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwimSure · A swim school inside your society's pool",
  description:
    "Swimming lessons for children aged 5–12 inside your Bengaluru apartment society's pool. A certified coach and a lifeguard at every class. ₹3,000 a month for 12 classes.",
  openGraph: {
    title: "SwimSure · A swim school inside your society's pool",
    description: "Certified coach + lifeguard at every class. Small batches, evenings 5–8 pm, no travel.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2442",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
