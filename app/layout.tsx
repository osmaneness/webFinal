import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Şehir Etkinlik Rehberi",
  description: "Yerel etkinlikleri keşfedin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <AuthProvider>
          <EventProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </EventProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
