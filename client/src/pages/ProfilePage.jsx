import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  // Basic authentication check
  useEffect(() => {
    const token = localStorage.getItem('stylekart_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 border-b dark:border-norm pb-4">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full md:w-1/4 bg-sec p-4 rounded border dark:border-norm">
          <ul className="space-y-4">
            <li className="font-bold text-brand cursor-pointer">Profile Info</li>
            <li className="text-secondary hover:text-brand cursor-pointer">My Orders</li>
            <li className="text-secondary hover:text-brand cursor-pointer">Wishlist</li>
            <li className="text-secondary hover:text-brand cursor-pointer">Addresses</li>
            <li 
              className="text-red-500 font-semibold cursor-pointer pt-4 mt-4 border-t dark:border-norm"
              onClick={() => {
                localStorage.removeItem('stylekart_token');
                navigate('/login');
              }}
            >
              Logout
            </li>
          </ul>
        </div>

        {/* Profile Content */}
        <div className="w-full md:w-3/4 bg-card p-6 rounded shadow-sm border dark:border-norm">
          <h2 className="text-xl font-bold mb-6">Profile Details</h2>
          <form className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-secondary">Name</label>
              <input 
                type="text" 
                className="mt-1 block w-full border-input dark:bg-gray-700 dark:text-white rounded-md shadow-sm border p-2 focus:ring-brand focus:border-brand" 
                defaultValue="Ganesh Kumar" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary">Email Address</label>
              <input 
                type="email" 
                className="mt-1 block w-full border-input dark:bg-gray-700 dark:text-white rounded-md shadow-sm border p-2 focus:ring-brand focus:border-brand" 
                defaultValue="ganesh@example.com" 
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary">New Password</label>
              <input 
                type="password" 
                className="mt-1 block w-full border-input dark:bg-gray-700 dark:text-white rounded-md shadow-sm border p-2 focus:ring-brand focus:border-brand" 
                placeholder="Leave blank to keep current" 
              />
            </div>
            <button className="bg-brand text-white font-bold py-2 px-6 rounded hover:bg-brand-hover transition-colors">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
