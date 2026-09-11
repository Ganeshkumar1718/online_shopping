import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] bg-sec">
        <img 
          src="http://localhost:5000/uploads/banner.jpg" 
          alt="Fashion Sale Banner" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Summer Collection 2026
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md">
            Discover the latest trends in fashion. Unbeatable prices on premium clothing.
          </p>
          <Link 
            to="/products/women" 
            className="bg-brand hover:bg-brand-hover text-white font-bold py-3 px-8 rounded shadow-lg transition-transform transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-secondary dark:text-gray-200 uppercase tracking-widest">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CategoryCard title="Men" link="/products/men" image="http://localhost:5000/uploads/men.jpg" />
          <CategoryCard title="Women" link="/products/women" image="http://localhost:5000/uploads/women.jpg" />
          <CategoryCard title="Boys" link="/products/boys" image="http://localhost:5000/uploads/boy.jpg" />
          <CategoryCard title="Girls" link="/products/girls" image="http://localhost:5000/uploads/girl.jpg" />
        </div>
      </section>
      
      {/* Deals of the Day (Mock) */}
      <section className="py-16 bg-sec">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-secondary dark:text-gray-200 uppercase tracking-widest">
            Deals of the Day
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <ProductPlaceholder title="Men's Casual Shirt" price="899" oldPrice="1499" discount="40% OFF" image="http://localhost:5000/uploads/shirt1.jpg" />
            <ProductPlaceholder title="Women's Floral Kurti" price="799" oldPrice="1299" discount="38% OFF" image="http://localhost:5000/uploads/kurti1.jpg" />
            <ProductPlaceholder title="Men's Denim Jacket" price="1299" oldPrice="2499" discount="48% OFF" image="http://localhost:5000/uploads/shirt2.jpg" />
            <ProductPlaceholder title="Women's Summer Dress" price="999" oldPrice="1999" discount="50% OFF" image="http://localhost:5000/uploads/women1.jpg" />
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for category cards
const CategoryCard = ({ title, link, image }) => (
  <Link to={link} className="relative group overflow-hidden rounded-lg shadow-sm block h-64">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-40" />
    <div className="absolute bottom-4 left-0 right-0 text-center">
      <h3 className="text-xl font-bold text-white drop-shadow-md uppercase tracking-wider">{title}</h3>
    </div>
  </Link>
);

// Helper component for product placeholders
const ProductPlaceholder = ({ title, price, oldPrice, discount, image }) => (
  <div className="bg-card border border-norm rounded p-4 shadow-sm hover:shadow-lg transition-shadow group cursor-pointer">
    <div className="relative overflow-hidden mb-4 rounded h-64 bg-sec flex items-center justify-center p-2">
      <img src={image} alt={title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        {discount}
      </div>
    </div>
    <h4 className="text-brand font-semibold truncate mb-1">{title}</h4>
    <div className="flex items-center space-x-2">
      <span className="text-heading font-bold">₹{price}</span>
      <span className="text-muted line-through text-sm">₹{oldPrice}</span>
    </div>
  </div>
);

export default HomePage;
