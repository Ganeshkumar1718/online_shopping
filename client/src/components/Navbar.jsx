import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, LogOut, Shield, Sun, Moon, Package } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const checkAuth = () => {
    const userData = localStorage.getItem('stylekart_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('stylekart_token');
    localStorage.removeItem('stylekart_user');
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  return (
    <header className="bg-[#4A2C20] shadow-sm sticky top-0 z-50">
      {/* Top Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-[#FFF8EF] tracking-tight hover:text-[#C49A5A] transition-colors">
          <img src="/logo.png" alt="One7 Logo" className="h-10 w-auto rounded object-contain bg-white/10" />
          <span>One7</span>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full shadow-md rounded-sm overflow-hidden border-none">
            <input 
              type="text" 
              placeholder="Search for products, brands and more" 
              className="w-full bg-white text-[#222222] border-none py-2 px-4 focus:outline-none placeholder:text-gray-500"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-white">
              <Search className="text-[#4A2C20] w-5 h-5 hover:text-[#C49A5A] transition-colors" />
            </button>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-6 text-[#FFF8EF] font-semibold">
          <button type="button" onClick={toggleTheme} className="flex items-center hover:text-[#C49A5A] transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5 mr-1" /> : <Moon className="w-5 h-5 mr-1" />}
            <span className="hidden md:block">Theme</span>
          </button>

          {user?.role === 'admin' && (
            <Link to="/admin" className="flex items-center hover:text-[#C49A5A] transition-colors">
              <Shield className="w-5 h-5 mr-1" />
              <span className="hidden md:block">Admin</span>
            </Link>
          )}

          {user ? (
            <div className="relative group">
              <button className="flex items-center hover:text-[#C49A5A] transition-colors">
                <span className="hidden md:block">{user.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block bg-[#4A2C20] shadow-lg border border-[#3A2218] rounded-b w-40 z-50 text-[#FFF8EF] font-normal">
                <ul className="py-2">
                  <li><Link to="/profile" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">My Profile</Link></li>
                  <li><Link to="/orders" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Orders</Link></li>
                  <li><Link to="/wishlist" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Wishlist</Link></li>
                  <li><button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex items-center transition-colors bg-[#C49A5A] text-[#4A2C20] px-8 py-1 rounded-sm shadow hover:bg-[#E0B87A] font-bold">
              <span>Login</span>
            </Link>
          )}

          <Link to="/cart" className="flex items-center hover:text-[#C49A5A] transition-colors">
            <ShoppingBag className="w-5 h-5 mr-1" />
            <span className="hidden md:block">Cart</span>
          </Link>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="bg-[#4A2C20] border-t border-[#3A2218] shadow hidden md:block">
        <ul className="container mx-auto px-4 flex justify-center space-x-8 text-sm font-semibold text-[#FFF8EF] py-3">
          <li><Link to="/" className="hover:text-[#C49A5A] transition-colors inline-block py-2">Home</Link></li>
          
          {/* Men Dropdown */}
          <li className="relative group">
            <Link to="/products/men" className="hover:text-[#C49A5A] transition-colors inline-block py-2 flex items-center">Men <span className="ml-1 text-[10px]">▼</span></Link>
            <div className="absolute left-0 top-full hidden group-hover:block bg-[#4A2C20] shadow-lg border border-[#3A2218] rounded-b w-48 z-50 text-[#FFF8EF] font-normal">
              <ul className="py-2">
                <li><Link to="/products/men?sub=shirt" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Shirt</Link></li>
                <li><Link to="/products/men?sub=tshirt" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">T-Shirt</Link></li>
              </ul>
            </div>
          </li>

          {/* Women Dropdown */}
          <li className="relative group">
            <Link to="/products/women" className="hover:text-[#C49A5A] transition-colors inline-block py-2 flex items-center">Women <span className="ml-1 text-[10px]">▼</span></Link>
            <div className="absolute left-0 top-full hidden group-hover:block bg-[#4A2C20] shadow-lg border border-[#3A2218] rounded-b w-48 z-50 text-[#FFF8EF] font-normal">
              <ul className="py-2">
                <li><Link to="/products/women?sub=chudi" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Chudi</Link></li>
                <li><Link to="/products/women?sub=kurti" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Kurti</Link></li>
                <li><Link to="/products/women?sub=shirt" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Shirt</Link></li>
                <li><Link to="/products/women?sub=tshirt" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">T-Shirt</Link></li>
              </ul>
            </div>
          </li>

          {/* Boys Dropdown */}
          <li className="relative group">
            <Link to="/products/boys" className="hover:text-[#C49A5A] transition-colors inline-block py-2 flex items-center">Baby & Kids <span className="ml-1 text-[10px]">▼</span></Link>
            <div className="absolute left-0 top-full hidden group-hover:block bg-[#4A2C20] shadow-lg border border-[#3A2218] rounded-b w-48 z-50 text-[#FFF8EF] font-normal">
              <ul className="py-2">
                <li><Link to="/products/boys?sub=shirt" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Boys Shirt</Link></li>
                <li><Link to="/products/boys?sub=tshirt" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Boys T-Shirt</Link></li>
                <li><Link to="/products/girls?sub=tshirt" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Girls T-Shirt</Link></li>
                <li><Link to="/products/girls?sub=shirt" className="block px-4 py-2 hover:bg-[#3A2218] hover:text-[#C49A5A] transition-colors">Girls Shirt</Link></li>
              </ul>
            </div>
          </li>

          <li><Link to="/new-arrivals" className="hover:text-[#C49A5A] transition-colors inline-block py-2">New Arrivals</Link></li>
          <li><Link to="/sale" className="hover:text-[#C49A5A] transition-colors inline-block py-2">Offer Zone</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
