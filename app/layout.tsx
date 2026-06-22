import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Upvik — Digital Marketing Agency Bhubaneswar",
  description:
    "Odisha's #1 digital marketing and web development agency. SEO, website design, mobile apps, and performance marketing for Bhubaneswar businesses.",
  keywords: [
    "digital marketing agency Bhubaneswar",
    "SEO Odisha",
    "web development Bhubaneswar",
    "mobile app development Odisha",
    "PPC Google Ads Bhubaneswar",
  ],
  openGraph: {
    title: "Upvik — Digital Marketing Agency Bhubaneswar",
    description:
      "Odisha's #1 digital marketing and web development agency. We grow Bhubaneswar businesses digitally.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
