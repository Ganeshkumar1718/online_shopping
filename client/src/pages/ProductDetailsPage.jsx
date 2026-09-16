import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Star } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const stateProduct = location.state?.product;

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  
  const token = localStorage.getItem('stylekart_token');

  // Dummy product data since it's not in the DB
  const product = {
    id,
    name: stateProduct?.name || 'Awesome Product ' + id,
    price: stateProduct?.price || 899,
    image: stateProduct?.image || 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'This is a premium product. High quality material and trendy design.'
  };

  useEffect(() => {
    fetchReviews();
  }, [id, fetchReviews]);

  const fetchReviews = React.useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'https://online-shopping-7fom.onrender.com'}`}/api/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('You must be logged in to review.');
      return;
    }
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'https://online-shopping-7fom.onrender.com'}`}/api/reviews/${id}`, 
        { rating, comment }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      setError('');
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting review');
    }
  };



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-muted mb-6">
        <Link to="/" className="hover:text-brand transition-colors">Home</Link> / 
        <span className="text-brand font-semibold mx-2">Products</span> / {product.name}
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="md:w-1/2 flex gap-4">
          {/* Main Image */}
          <div className="flex-1 h-96 md:h-[500px] bg-sec flex items-center justify-center p-4 rounded">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain rounded" 
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-heading mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-brand mb-6">₹{product.price}</p>
          <p className="text-secondary mb-8">{product.description}</p>
          
          <button className="bg-brand text-white py-3 px-8 rounded font-bold hover:bg-brand-hover transition-colors">
            Add to Bag
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-norm pt-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Customer Reviews</h2>
        
        {/* Write a review */}
        <div className="bg-sec p-6 rounded-lg mb-8 max-w-2xl">
          <h3 className="font-semibold text-lg mb-4 dark:text-white">Write a Review</h3>
          {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
          
          <form onSubmit={submitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Rating</label>
              <select 
                className="w-full border-input rounded p-2 outline-none dark:bg-gray-700 dark:text-white"
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Terrible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Comment</label>
              <textarea 
                required
                rows="4" 
                className="w-full border-input rounded p-2 outline-none border dark:bg-gray-700 dark:text-white"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="bg-brand text-white py-2 px-6 rounded hover:bg-sec dark:hover:bg-brand-hover transition-colors">
              Submit Review
            </button>
          </form>
        </div>

        {/* List Reviews */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map(review => (
              <div key={review._id} className="border-b border-norm pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-bold text-brand">{review.name}</div>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
                <p className="text-secondary">{review.comment}</p>
                <div className="text-xs text-muted mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
