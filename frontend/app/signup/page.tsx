'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


export default function Signup() {

   const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'customer'
  });

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();

      const { name, email, password, confirmPassword, phone, userType } = formData;

    
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

     try {
    const res = await fetch('http://localhost:5555/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        phone_no: phone,
        role: userType
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Registered successfully!');
      setTimeout(() => {
        if (userType === 'admin') {
          router.push('/owner-dashboard');
        } else {
          router.push('/');
        }
      }, 2000);
    } else {
      toast.error(data.message || 'Registration failed. Try again.');
    }
  } catch (err) {
    toast.error('Server error. Please try again later.');
  }
  };


  return (
    <div className="min-h-screen flex">
      
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">FoodCourt Hub</h1>
            <p className="text-xl">Join our community of food lovers and restaurant owners</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
         
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join us to start ordering and reserving tables</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'customer' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.userType === 'customer' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">Customer</div>
                  <div className="text-sm text-gray-600">Order food & reserve tables</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'admin' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.userType === 'admin' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">Admin</div>
                  <div className="text-sm text-gray-600">Manage your restaurant</div>
                </button>
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Veroline@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="+254 700 000 000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Minimum 6 characters"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Repeat your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Create {formData.userType === 'admin' ? 'Admin' : 'Customer'} Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-600 hover:text-amber-500 font-medium">
                Log in here
              </Link>
            </p>
          </div>

        </div>
      </div>
          <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}