import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, Circle, Truck, Package, XCircle, Undo2 } from 'lucide-react';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [reason, setReason] = useState('');
  
  const token = localStorage.getItem('stylekart_token');

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(res.data);
    } catch (err) {
      console.error('Failed to fetch order', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/${id}/cancel`, { reason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowCancelModal(false);
      fetchOrder();
    } catch (err) {
      console.error('Failed to cancel', err);
    }
  };

  const handleReturn = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/${id}/return`, { reason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowReturnModal(false);
      fetchOrder();
    } catch (err) {
      console.error('Failed to return', err);
    }
  };

  if (loading) return <div className="p-8 text-center dark:text-white">Loading order details...</div>;
  if (!order) return <div className="p-8 text-center dark:text-white">Order not found.</div>;

  const steps = [
    { label: 'Processing', key: 'Processing' },
    { label: 'Shipped', key: 'Shipped' },
    { label: 'Out for Delivery', key: 'OutForDelivery' },
    { label: 'Delivered', key: 'Delivered' }
  ];

  let currentStepIndex = 0;
  if (order.status === 'Shipped') currentStepIndex = 1;
  if (order.status === 'Out for Delivery') currentStepIndex = 2;
  if (order.status === 'Delivered') currentStepIndex = 3;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-muted mb-6">
        <Link to="/" className="hover:text-brand transition-colors">Home</Link> / 
        <Link to="/orders" className="hover:text-brand transition-colors mx-2">My Orders</Link> / 
        <span className="text-brand font-semibold mx-2">{order._id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Items Section */}
          <div className="bg-card rounded-lg shadow-sm border border-norm p-6">
            <h2 className="text-lg font-bold text-heading mb-4">Items in this order</h2>
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 border-b border-norm last:border-0 pb-4 mb-4 last:pb-0 last:mb-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-sec dark:bg-gray-700" />
                <div className="flex-1">
                  <h3 className="font-semibold text-brand">{item.name}</h3>
                  <p className="text-sm text-muted">Qty: {item.qty}</p>
                  <p className="font-bold text-heading mt-1">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tracking Stepper */}
          <div className="bg-card rounded-lg shadow-sm border border-norm p-6">
            <h2 className="text-lg font-bold text-heading mb-6">Order Status: <span className="text-brand">{order.status}</span></h2>
            
            {order.status === 'Cancelled' ? (
              <div className="flex items-center text-red-500 gap-3">
                <XCircle className="w-8 h-8" />
                <div>
                  <p className="font-bold">Order Cancelled</p>
                  <p className="text-sm text-secondary">Reason: {order.cancelReason}</p>
                </div>
              </div>
            ) : order.status === 'Returned' ? (
              <div className="flex items-center text-orange-500 gap-3">
                <Undo2 className="w-8 h-8" />
                <div>
                  <p className="font-bold">Order Returned</p>
                  <p className="text-sm text-secondary">Reason: {order.returnReason}</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sec dark:bg-gray-700"></div>
                <div className="space-y-8 relative">
                  {steps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const timestamp = order.statusTimestamps[step.key];
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${isCompleted ? 'bg-green-500 text-white' : 'bg-sec dark:bg-gray-700 text-muted dark:text-muted'}`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className={`font-semibold ${isCompleted ? 'text-heading' : 'text-muted'}`}>{step.label}</p>
                          {timestamp && <p className="text-xs text-muted">{new Date(timestamp).toLocaleString()}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Actions & Details */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow-sm border border-norm p-6">
            <h2 className="text-lg font-bold text-heading mb-4">Shipping Details</h2>
            <p className="text-secondary text-sm">
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-sm border border-norm p-6">
            <h2 className="text-lg font-bold text-heading mb-4">Payment Summary</h2>
            <div className="flex justify-between text-sm text-secondary mb-2">
              <span>Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-heading mt-4 pt-4 border-t border-norm">
              <span>Total Amount</span>
              <span>₹{order.totalPrice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {order.status === 'Processing' && (
            <button onClick={() => setShowCancelModal(true)} className="w-full bg-card border border-input text-secondary py-3 rounded font-bold hover:bg-sec dark:hover:bg-gray-700 transition">
              Cancel Order
            </button>
          )}

          {order.status === 'Delivered' && (
            <button onClick={() => setShowReturnModal(true)} className="w-full bg-card border border-input text-secondary py-3 rounded font-bold hover:bg-sec dark:hover:bg-gray-700 transition">
              Return Product
            </button>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Cancel Order</h2>
            <p className="text-secondary mb-4">Please let us know why you are cancelling this order:</p>
            <div className="space-y-3 mb-6">
              {['I changed my mind', 'Expected delivery time is too long', 'Price dropped', 'Duplicate order', 'Other'].map(r => (
                <label key={r} className="flex items-center space-x-3 text-secondary">
                  <input type="radio" name="reason" value={r} onChange={(e) => setReason(e.target.value)} className="text-brand focus:ring-brand" />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 py-2 border border-input rounded text-secondary hover:bg-sec dark:hover:bg-gray-700">Go Back</button>
              <button onClick={handleCancel} disabled={!reason} className="flex-1 py-2 bg-brand text-white rounded hover:bg-brand-hover disabled:opacity-50">Confirm Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Return Product</h2>
            <p className="text-secondary mb-4">Please select a reason for return:</p>
            <div className="space-y-3 mb-6">
              {['Product is damaged or defective', 'Wrong item received', 'Quality not as expected', 'Size/Fit issue', 'Other'].map(r => (
                <label key={r} className="flex items-center space-x-3 text-secondary">
                  <input type="radio" name="reason" value={r} onChange={(e) => setReason(e.target.value)} className="text-brand focus:ring-brand" />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowReturnModal(false)} className="flex-1 py-2 border border-input rounded text-secondary hover:bg-sec dark:hover:bg-gray-700">Go Back</button>
              <button onClick={handleReturn} disabled={!reason} className="flex-1 py-2 bg-brand text-white rounded hover:bg-brand-hover disabled:opacity-50">Confirm Return</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
