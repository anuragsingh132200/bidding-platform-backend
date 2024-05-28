const express = require('express');
const { getBidsByItemId, createBid } = require('../controllers/bidController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:itemId/bids', getBidsByItemId);
router.post('/:itemId/bids', authenticateToken, createBid);

module.exports = router;
