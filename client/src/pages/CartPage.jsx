import React from 'react';

const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Shopping Bag</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {/* Empty state for now */}
          <div className="bg-card p-8 text-center rounded border dark:border-norm">
            <h2 className="text-xl font-bold mb-2">Your bag is empty</h2>
            <p className="text-muted mb-6">There is nothing in your bag. Let's add some items.</p>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-card p-6 rounded border dark:border-norm">
            <h3 className="font-bold text-brand border-b dark:border-norm pb-4 mb-4 uppercase">Price Details</h3>
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Total MRP</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between mb-4 border-b dark:border-norm pb-4">
              <span className="text-secondary">Discount on MRP</span>
              <span className="text-green-500">-₹0</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total Amount</span>
              <span>₹0</span>
            </div>
            <button className="w-full bg-brand text-white font-bold py-3 rounded opacity-50 cursor-not-allowed">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
