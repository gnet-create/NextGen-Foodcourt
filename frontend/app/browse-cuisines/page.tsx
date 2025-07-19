'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { restaurants, cuisines } from '@/lib/data';

interface CartItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
}

export default function BrowseCuisines() {
  const searchParams = useSearchParams();
  const cuisineParam = searchParams.get('cuisine');
  
  const [selectedCuisine, setSelectedCuisine] = useState(cuisineParam || '');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCuisine = selectedCuisine === '' || restaurant.cuisine === selectedCuisine;
    const matchesSearch = searchTerm === '' || 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCuisine && matchesSearch;
  });

  const restaurantsForCuisine = selectedCuisine 
    ? restaurants.filter(r => r.cuisine === selectedCuisine)
    : [];

  const selectedRestaurantData = restaurants.find(r => r.id === selectedRestaurant);

  const addToCart = (dishId: string, name: string, price: number, restaurantName: string) => {
    const existingItem = cart.find(item => item.dishId === dishId);
    
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.dishId === dishId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, {
        dishId,
        name,
        price,
        quantity: 1,
        restaurantName
      }];
    }
    
    setCart(newCart);
    // Save to localStorage
    localStorage.setItem('foodCourtCart', JSON.stringify(newCart));
  };

  const updateCartQuantity = (dishId: string, quantity: number) => {
    let newCart;
    if (quantity === 0) {
      newCart = cart.filter(item => item.dishId !== dishId);
    } else {
      newCart = cart.map(item =>
        item.dishId === dishId 
          ? { ...item, quantity }
          : item
      );
    }
    
    setCart(newCart);
    localStorage.setItem('foodCourtCart', JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart first!');
      return;
    }
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodCourtCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div className="relative">
      <div className="mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">Browse by Cuisine</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Find restaurants by cuisine type or search by name
        </p>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          
          <select
            value={selectedCuisine}
            onChange={(e) => {
              setSelectedCuisine(e.target.value);
              setSelectedRestaurant('');
            }}
            className="px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine.name} value={cuisine.name}>
                {cuisine.name}
              </option>
            ))}
          </select>

          {cart.length > 0 && (
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 text-lg font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 relative shadow-lg"
            >
              Cart ({cart.length})
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Restaurant Selection for Selected Cuisine */}
      {selectedCuisine && restaurantsForCuisine.length > 1 && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Choose {selectedCuisine} Restaurant
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantsForCuisine.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => setSelectedRestaurant(restaurant.id)}
                className={`p-6 border-2 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                  selectedRestaurant === restaurant.id 
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700'
                }`}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{restaurant.name}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{restaurant.description}</p>
                <p className="text-lg text-orange-600 dark:text-orange-400 mt-3 font-semibold">{restaurant.dishes.length} dishes available</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Display */}
      {selectedCuisine && (selectedRestaurant || restaurantsForCuisine.length === 1) && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Menu - {selectedRestaurantData?.name || restaurantsForCuisine[0]?.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(selectedRestaurantData?.dishes || restaurantsForCuisine[0]?.dishes || []).map((dish) => (
              <div key={dish.id} className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 bg-white dark:bg-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">{dish.name}</h4>
                  {dish.isPopular && (
                    <span className="text-sm bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full font-semibold">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    KSh {dish.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(
                      dish.id, 
                      dish.name, 
                      dish.price, 
                      selectedRestaurantData?.name || restaurantsForCuisine[0]?.name || ''
                    )}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Restaurants Grid */}
      {!selectedCuisine && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {restaurant.name}
                </h3>
                <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold mb-3">
                  {restaurant.cuisine}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                  {restaurant.description}
                </p>
                <button
                  onClick={() => {
                    setSelectedCuisine(restaurant.cuisine);
                    setSelectedRestaurant(restaurant.id);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg h-full overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-xl text-gray-500 dark:text-gray-400">Your cart is empty</p>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.dishId} className="border-b border-gray-200 dark:border-gray-600 pb-6">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">{item.name}</h4>
                      <p className="text-lg text-gray-600 dark:text-gray-300">{item.restaurantName}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateCartQuantity(item.dishId, item.quantity - 1)}
                            className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 text-lg font-bold"
                          >
                            -
                          </button>
                          <span className="mx-3 text-xl font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.dishId, item.quantity + 1)}
                            className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 text-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xl font-bold text-green-600 dark:text-green-400">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-6">
                    <div className="flex justify-between items-center text-2xl font-bold mb-6">
                      <span>Total:</span>
                      <span className="text-green-600 dark:text-green-400">KSh {getTotalPrice().toLocaleString()}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {filteredRestaurants.length === 0 && !selectedCuisine && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-2xl">No restaurants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}