import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Package } from 'lucide-react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('stylekart_token');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  const seedMockOrders = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/seed`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      console.error('Failed to seed orders', err);
    }
  };

  if (loading) return <div className="p-8 text-center dark:text-white">Loading orders...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-heading">My Orders</h1>
        {orders.length === 0 && (
          <button onClick={seedMockOrders} className="bg-brand text-white px-4 py-2 rounded text-sm hover:bg-brand-hover transition">
            Generate Mock Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg shadow-sm border border-norm">
          <Package className="w-16 h-16 text-gray-300 dark:text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-medium text-secondary mb-2">You have no orders yet</h2>
          <Link to="/" className="text-brand hover:underline">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Link key={order._id} to={`/orders/${order._id}`} className="block bg-card rounded-lg shadow-sm border border-norm hover:shadow-md transition-shadow p-4">
              <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-norm pb-4 mb-4">
                <div className="mb-2 md:mb-0">
                  <p className="text-sm text-muted">Order ID: <span className="font-medium text-brand">{order._id}</span></p>
                  <p className="text-sm text-muted">Placed on: <span className="font-medium text-brand">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-brand">Total: ₹{order.totalPrice}</p>
                  <p className={`text-sm font-bold mt-1 ${order.status === 'Cancelled' ? 'text-red-500' : order.status === 'Delivered' ? 'text-green-500' : 'text-blue-500'}`}>
                    {order.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {order.orderItems.map((item, index) => (
                  <img key={index} src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded bg-sec dark:bg-gray-700" />
                ))}
                <p className="text-sm text-secondary">{order.orderItems.length} item(s)</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
