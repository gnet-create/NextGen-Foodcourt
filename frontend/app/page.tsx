'use client';

import Link from 'next/link';
import { restaurants, cuisines } from '@/lib/data';

export default function Home() {
 
  const displayCuisines = cuisines.slice(0, 4);

  return (
    <div>
  
      <div className="relative h-96 mb-16 rounded-lg overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-purple-900/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Welcome to FoodCourt Hub
            </h1>
            <p className="text-2xl max-w-4xl mx-auto leading-relaxed">
              Discover amazing cuisines from multiple restaurants all in one place. 
              Reserve your table in advance and order from your favorite outlets 
              while enjoying our comfortable shared seating experience.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            Browse by Restaurant
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore all our restaurant partners and discover what each outlet has to offer
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {restaurants.slice(0, 4).map((restaurant) => (
            <Link 
              key={restaurant.id} 
              href={`/order?outlet=${restaurant.id}`} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div 
                className="h-56 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${restaurant.image})`
                }}
              >
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {restaurant.name}
                </h3>
                <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">
                  {restaurant.cuisine} Cuisine
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/browse-outlets"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-xl text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Restaurants
          </Link>
        </div>
      </div>

      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            Browse by Cuisines
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover restaurants by your favorite cuisine type and find exactly what you're craving
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {displayCuisines.map((cuisine) => (
            <Link 
              key={cuisine.name} 
              href={`/browse-cuisines?cuisine=${cuisine.name}`} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div 
                className="h-32 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${cuisine.image})`
                }}
              >
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                  {cuisine.name}
                </p>
              </div>
            </Link>
          ))}
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

      <div className="grid md:grid-cols-3 gap-8">
        <Link 
          href="/popular-dishes" 
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Popular Dishes</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">See what everyone's ordering today</p>
        </Link>
        
        <Link 
          href="/reservations" 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Reserve Table</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">Book your spot in advance</p>
        </Link>
        
        <Link 
          href="/reviews" 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Customer Reviews</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">Read what others are saying</p>
        </Link>
      </div>
    </div>
  );
}