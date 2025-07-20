'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart, Utensils } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  
  // State to track user login status and cart
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Check login status when component loads
  useEffect(() => {
    // Only run this code in the browser (not on server)
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('userType');
      setIsLoggedIn(!!userType);
      setIsOwner(userType === 'owner');
      
      // Load cart count from localStorage
      const savedCart = localStorage.getItem('foodCourtCart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(totalItems);
      }
    }
  }, []);

  // Navigation menu items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/order', label: 'Orders' },
    { href: '/reservations', label: 'Reservations' },
    { href: '/signup', label: 'Sign Up' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              FoodCourt Hub
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-semibold transition-all duration-300 hover:text-orange-600 hover:scale-105 ${
                  pathname === item.href 
                    ? 'text-orange-600 border-b-2 border-orange-600' 
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              href="/checkout"
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Owner Dashboard Link (only show if logged in as owner) */}
            {isOwner && (
              <Link
                href="/owner-dashboard"
                className={`text-lg font-semibold transition-all duration-300 hover:text-orange-600 hover:scale-105 ${
                  pathname === '/owner-dashboard' 
                    ? 'text-orange-600 border-b-2 border-orange-600' 
                    : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart */}
            <Link
              href="/checkout"
              className="relative p-2 text-gray-700"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Dropdown */}
            <select
              onChange={(e) => window.location.href = e.target.value}
              value={pathname}
              className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
              {isOwner && (
                <option value="/owner-dashboard">Dashboard</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}