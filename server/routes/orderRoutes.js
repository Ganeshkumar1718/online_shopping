import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order && order.user.toString() === req.user.id) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || order.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (['Delivered', 'Cancelled', 'Returned'].includes(order.status)) {
      return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
    }

    order.status = 'Cancelled';
    order.cancelReason = req.body.reason || 'User requested cancellation';
    order.statusTimestamps.Cancelled = Date.now();
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Return an order
// @route   PUT /api/orders/:id/return
// @access  Private
router.put('/:id/return', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || order.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'Delivered') {
      return res.status(400).json({ message: 'Only delivered orders can be returned' });
    }

    order.status = 'Returned';
    order.returnReason = req.body.reason || 'User requested return';
    order.statusTimestamps.Returned = Date.now();
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Seed mock orders for testing
// @route   POST /api/orders/seed
// @access  Private
router.post('/seed', protect, async (req, res) => {
  try {
    await Order.deleteMany({ user: req.user.id });
    
    const orders = [
      {
        user: req.user.id,
        orderItems: [
          { name: 'Trendy Fashions', qty: 1, image: 'http://localhost:5000/uploads/nc1.webp', price: 899, product: '1' }
        ],
        shippingAddress: { address: '123 Fake St', city: 'Mumbai', postalCode: '400001', country: 'India' },
        paymentMethod: 'Credit Card',
        totalPrice: 899,
        status: 'Processing',
        statusTimestamps: { Processing: Date.now() }
      },
      {
        user: req.user.id,
        orderItems: [
          { name: 'Men Shirt', qty: 2, image: 'http://localhost:5000/uploads/shirt1.jpg', price: 1598, product: '2' }
        ],
        shippingAddress: { address: '123 Fake St', city: 'Mumbai', postalCode: '400001', country: 'India' },
        paymentMethod: 'PayPal',
        totalPrice: 1598,
        status: 'Delivered',
        statusTimestamps: { Processing: Date.now() - 86400000*3, Shipped: Date.now() - 86400000*2, OutForDelivery: Date.now() - 86400000, Delivered: Date.now() }
      }
    ];

    const createdOrders = await Order.insertMany(orders);
    res.status(201).json(createdOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
