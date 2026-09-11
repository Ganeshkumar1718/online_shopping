import express from 'express';
import Review from '../models/Review.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new review
// @route   POST /api/reviews/:productId
// @access  Private
router.post('/:productId', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({
      productId: req.params.productId,
      user: req.user.id
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed by you' });
    }

    const review = await Review.create({
      productId: req.params.productId,
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
