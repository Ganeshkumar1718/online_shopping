import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        email, password
      });
      localStorage.setItem('stylekart_token', res.data.token);
      localStorage.setItem('stylekart_user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('authChange'));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-card p-8 rounded-lg shadow-md border border-norm">
      <div className="flex justify-center mb-4">
        <img src="/logo.png" alt="One7 Logo" className="h-16 w-auto object-contain" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-heading">Sign In</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
        <div>
          <label className="block text-sm font-medium text-secondary">Email address</label>
          <div className="mt-1">
            <input
              type="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand sm:text-sm dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary">Password</label>
          <div className="mt-1">
            <input
              type="password"
              required
              className="appearance-none block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand sm:text-sm dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-brand focus:ring-brand border-norm rounded dark:bg-gray-700 dark:border-norm"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-brand dark:text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-brand hover:text-brand-hover">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            Sign in
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-brand hover:text-brand-hover">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
