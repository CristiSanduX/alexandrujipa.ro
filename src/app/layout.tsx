import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexandru Jipa — Școala de Dans Tradițional Românesc",
  description:
    "Școala de dans tradițional românesc condusă de Alexandru Jipa din Iași. Dansuri populare moldovenești pentru copii și tineri. Înscrie-te acum!",
  keywords: [
    "dans traditional romanesc",
    "scoala de dans Iasi",
    "Alexandru Jipa",
    "dansuri populare",
    "folclor moldovenesc",
    "dans copii Iasi",
    "dans tineri Iasi",
  ],
  authors: [{ name: "Alexandru Jipa" }],
  creator: "Alexandru Jipa",
  metadataBase: new URL("https://alexandrujipa.ro"),
  openGraph: {
    title: "Alexandru Jipa — Școala de Dans Tradițional Românesc",
    description:
      "Dansuri populare moldovenești pentru copii și tineri din Iași. Tradiția, trăită cu mândrie.",
    url: "https://alexandrujipa.ro",
    siteName: "Școala de Dans Alexandru Jipa",
    images: [
      {
        url: "/images/home.jpg",
        width: 1200,
        height: 630,
        alt: "Școala de Dans Alexandru Jipa",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandru Jipa — Școala de Dans Tradițional Românesc",
    description: "Dansuri populare moldovenești pentru copii și tineri din Iași.",
    images: ["/images/home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
