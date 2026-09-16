import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Basic authentication check
  useEffect(() => {
    const token = localStorage.getItem('stylekart_token');
    const user = JSON.parse(localStorage.getItem('stylekart_user'));
    if (!token) {
      navigate('/login');
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      const token = localStorage.getItem('stylekart_token');
      const res = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/profile`, {
        name,
        email,
        password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      localStorage.setItem('stylekart_user', JSON.stringify(res.data));
      setMessage('Profile updated successfully!');
      setPassword('');
      window.dispatchEvent(new Event('authChange'));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 border-b dark:border-norm pb-4">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full md:w-1/4 bg-sec p-4 rounded border dark:border-norm">
          <ul className="space-y-4">
            <li className="font-bold text-brand cursor-pointer">Profile Info</li>
            <li className="text-secondary hover:text-brand cursor-pointer" onClick={() => navigate('/orders')}>My Orders</li>
            <li className="text-secondary hover:text-brand cursor-pointer">Wishlist</li>
            <li className="text-secondary hover:text-brand cursor-pointer">Addresses</li>
            <li 
              className="text-red-500 font-semibold cursor-pointer pt-4 mt-4 border-t dark:border-norm"
              onClick={() => {
                localStorage.removeItem('stylekart_token');
                localStorage.removeItem('stylekart_user');
                window.dispatchEvent(new Event('authChange'));
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
          {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
          {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
          
          <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-secondary">Name</label>
              <input 
                type="text" 
                className="mt-1 block w-full border-input dark:bg-gray-700 dark:text-white rounded-md shadow-sm border p-2 focus:ring-brand focus:border-brand" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary">Email Address</label>
              <input 
                type="email" 
                className="mt-1 block w-full border-input dark:bg-gray-700 dark:text-white rounded-md shadow-sm border p-2 focus:ring-brand focus:border-brand" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary">New Password</label>
              <input 
                type="password" 
                className="mt-1 block w-full border-input dark:bg-gray-700 dark:text-white rounded-md shadow-sm border p-2 focus:ring-brand focus:border-brand" 
                placeholder="Leave blank to keep current" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-brand text-white font-bold py-2 px-6 rounded hover:bg-brand-hover transition-colors">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
