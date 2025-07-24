import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodCourt Hub',
  description: 'Reserve tables and order food in advance at our shared seating food court',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300`}>
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12 text-gray-900 dark:text-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}