import Avatar from "@/components/Avatar";
import Whatsapp from "@/components/Whatsapp";
import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-sans",
});

const fontMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SelahMinton | Badminton Community",
  description:
    "Komunitas badminton untuk berbagi tips, latihan, dan acara. Bergabunglah dengan pemain dan penggemar badminton lainnya untuk meningkatkan keterampilan Anda dan bersenang-senang!",
  keywords: [
    "SelahMinton",
    "Badminton",
    "Badminton Komunitas",
    "Badminton Tips",
    "Badminton Latihan",
    "Pemain Badminton",
    "Penggemar Badminton",
    "Komunitas Olahraga",
    "Latihan Badminton",
    "Teknik Badminton",
    "Forum Badminton",
    "Diskusi Badminton",
    "Jaringan Badminton",
  ],
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  openGraph: {
    title: "SelahMinton | Badminton Community",
    description:
      "Komunitas badminton untuk berbagi tips, latihan, dan acara. Bergabunglah dengan pemain dan penggemar badminton lainnya untuk meningkatkan keterampilan Anda dan bersenang-senang!",
    url: "https://selahminton.vercel.app", // ganti dengan domain asli
    siteName: "SelahMinton",
    images: [
      {
        url: "/og.jpg", // ganti dengan image promosi/brand
        width: 1200,
        height: 630,
        alt: "SelahMinton | Badminton Community",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased bg-gradient-to-r from-emerald-400 to-cyan-400`}
      >
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed p-4">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="bg-[#f4e2d1]/70 backdrop-blur-md rounded-3xl p-6 w-full max-w-md text-center shadow-xl relative">
              <Avatar />

              {children}
            </div>
          </main>
          <Whatsapp />
        </div>
      </body>
    </html>
  );
}
