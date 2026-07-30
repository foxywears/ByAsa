const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/orders - Create a new order
router.post('/', (req, res) => {
  try {
    const { customerDetails, items, totalAmount, paymentMethod } = req.body;

    // Validation
    if (!items || !items.length) {
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }
    if (!customerDetails || !customerDetails.name || !customerDetails.phone) {
      return res.status(400).json({ success: false, error: 'Customer name and phone are required' });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid total amount' });
    }

    const order = db.createOrder({
      customerDetails,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'WhatsApp',
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (err) {
    console.error('[Orders] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

// GET /api/orders - Fetch all orders
router.get('/', (req, res) => {
  try {
    const orders = db.getOrders();
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    console.error('[Orders] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id - Fetch order by ID or Reference
router.get('/:id', (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (err) {
    console.error('[Orders] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch order' });
  }
});


// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Paid', 'Shipped'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const order = db.updateOrderStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated', order });
  } catch (err) {
    console.error('[Orders] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to update order' });
  }
});

module.exports = router;

