'use client';

import { useState } from 'react';
import { reviews, restaurants } from '@/lib/data';

export default function Reviews() {
  const [allReviews, setAllReviews] = useState(reviews);
  const [newReview, setNewReview] = useState({
    customerName: '',
    outlet: '',
    rating: 5,
    comment: ''
  });

  // Check if user is logged in
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('userType');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert('Please log in to submit a review!');
      return;
    }
    
    if (!newReview.customerName || !newReview.outlet || !newReview.comment) {
      alert('Please fill in all fields!');
      return;
    }

    const reviewToAdd = {
      id: (allReviews.length + 1).toString(),
      customerName: newReview.customerName,
      outlet: newReview.outlet,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setAllReviews([reviewToAdd, ...allReviews]);
    
    alert(`Review submitted successfully!\n\nThank you for your feedback!`);
    
    // Reset form
    setNewReview({
      customerName: '',
      outlet: '',
      rating: 5,
      comment: ''
    });
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
            className={`text-xl ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">Customer Reviews</h1>
        <p className="text-gray-600">
          Share your experience and read what others are saying about our restaurants
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Write a Review</h2>
          
          {!isLoggedIn && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800">
                Please <a href="/signup" className="text-orange-600 font-semibold hover:underline">sign up</a> to submit a review.
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={newReview.customerName}
                onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter your name"
                disabled={!isLoggedIn}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant *
              </label>
              <select
                value={newReview.outlet}
                onChange={(e) => setNewReview({ ...newReview, outlet: e.target.value })}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                disabled={!isLoggedIn}
                required
              >
                <option value="">Choose a restaurant...</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.name}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview({ ...newReview, rating })
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review *
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Tell us about your experience..."
                disabled={!isLoggedIn}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isLoggedIn 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isLoggedIn}
            >
              Submit Review
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Reviews</h2>
          
          <div className="space-y-6">
            {allReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{review.customerName}</h3>
                    <p className="text-sm text-gray-600">{review.outlet}</p>
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Love our food court?
        </h2>
        <p className="text-gray-600 mb-6">
          Share your experience on social media and help others discover great food!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Share on Facebook
          </button>
          <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors">
            Share on Instagram
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Share on X
          </button>
        </div>
      </div>
    </div>
  );
}