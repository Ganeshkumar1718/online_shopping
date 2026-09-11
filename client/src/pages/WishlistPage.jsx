import React from 'react';

const WishlistPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">My Wishlist <span className="text-muted font-normal text-lg">0 items</span></h1>
      
      <div className="bg-card p-12 text-center rounded border">
        <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-muted mb-6">Save items that you like in your wishlist.</p>
        <button className="border border-primary text-brand font-bold py-2 px-8 rounded hover:bg-brand hover:text-white transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;
