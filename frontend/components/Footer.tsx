'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
              FoodCourt Hub
            </h3>
            <p className="text-gray-400 mb-4 text-lg">
              Experience the future of dining with our innovative shared seating food court.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-lg">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-gray-400 hover:text-white transition-colors text-lg">
                  Place Order
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="text-gray-400 hover:text-white transition-colors text-lg">
                  Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Restaurant Partners */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-orange-400">Our Partners</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-lg">Tamu Tamu Grills</li>
              <li className="text-gray-400 text-lg">Swahili Plates</li>
              <li className="text-gray-400 text-lg">Burger Bros</li>
              <li className="text-gray-400 text-lg">Sushi Spot</li>
              <li className="text-gray-400 text-lg">Spice Garden</li>
              <li className="text-gray-400 text-lg">Green Bowl</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-orange-400">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400 text-lg">FoodCourt Hub, Level 2</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400 text-lg">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400 text-lg">info@foodcourthub.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg">
              © 2024 FoodCourt Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}