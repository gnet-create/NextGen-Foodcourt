import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
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
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900 min-h-screen transition-colors duration-300`}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}