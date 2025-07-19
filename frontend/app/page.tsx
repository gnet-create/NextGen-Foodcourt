'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero Section with Background */}
      <div className="relative h-96 mb-16 rounded-lg overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Food Court"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-purple-900/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Welcome to NextGen Mall Food Court
            </h1>
            <p className="text-2xl max-w-4xl mx-auto leading-relaxed">
              Discover amazing cuisines from multiple restaurants all in one place. 
              Reserve your table in advance and order from your favorite outlets 
              while enjoying our comfortable shared seating experience.
            </p>
          </div>
        </div>
      </div>

      {/* Browse by Outlet Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">Browse by Outlet</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore all our restaurant partners and discover what each outlet has to offer
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <Link href="/order?outlet=1" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative h-56 w-full">
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Tamu Tamu Grills"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Tamu Tamu Grills</h3>
              <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">BBQ Cuisine</p>
            </div>
          </Link>

          <Link href="/order?outlet=2" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative h-56 w-full">
              <Image
                src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Swahili Plates"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Swahili Plates</h3>
              <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">Coastal Cuisine</p>
            </div>
          </Link>

          <Link href="/order?outlet=3" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative h-56 w-full">
              <Image
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Burger Bros"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Burger Bros</h3>
              <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">Fast Food</p>
            </div>
          </Link>

          <Link href="/order?outlet=4" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative h-56 w-full">
              <Image
                src="https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sushi Spot"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sushi Spot</h3>
              <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">Japanese Cuisine</p>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link 
            href="/browse-outlets"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-xl text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Outlets
          </Link>
        </div>
      </div>

      {/* Browse by Cuisines Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">Browse by Cuisines</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover restaurants by your favorite cuisine type and find exactly what you're craving
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <Link href="/browse-cuisines?cuisine=Coastal" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative h-32 w-full">
              <Image
                src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Coastal Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800 dark:text-white text-center">Coastal</p>
            </div>
          </Link>

          <Link href="/browse-cuisines?cuisine=Indian" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative h-32 w-full">
              <Image
                src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Indian Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800 dark:text-white text-center">Indian</p>
            </div>
          </Link>

          <Link href="/browse-cuisines?cuisine=Fast Food" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative h-32 w-full">
              <Image
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Fast Food"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800 dark:text-white text-center">Fast Food</p>
            </div>
          </Link>

          <Link href="/browse-cuisines?cuisine=BBQ" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative h-32 w-full">
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="BBQ Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800 dark:text-white text-center">BBQ</p>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link 
            href="/browse-cuisines"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-xl text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore All Cuisines
          </Link>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <Link href="/popular-dishes" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Popular Dishes</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">See what everyone's ordering today</p>
        </Link>
        
        <Link href="/reservations" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Reserve Table</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">Book your spot in advance</p>
        </Link>
        
        <Link href="/reviews" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Customer Reviews</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">Read what others are saying</p>
        </Link>
      </div>
    </div>
  );
}