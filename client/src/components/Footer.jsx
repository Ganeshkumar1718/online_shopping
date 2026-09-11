import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RotateCcw } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sec border-t border-norm mt-20 pt-8 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center md:justify-around gap-8 mb-8 text-center md:text-left">
          <div>
            <h3 className="text-sm font-bold text-brand uppercase mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link to="/products/men" className="hover:text-brand">Men</Link></li>
              <li><Link to="/products/women" className="hover:text-brand">Women</Link></li>
              <li><Link to="/products/boys" className="hover:text-brand">Baby & Kids</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-brand uppercase mb-4">Policies</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-brand transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-norm pt-6 mt-6 flex justify-center items-center text-sm text-secondary">
          <p className="text-center">© 2026 One7. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
