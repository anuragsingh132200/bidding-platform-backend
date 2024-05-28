const { createBid, getBidsByItemId } = require('../models/bid');
const { getItemById, updateItem } = require('../models/item');
const { createNotification } = require('../models/notification');
const { getIo } = require('../utils/socket');

const getBidsByItemId = async (req, res) => {
    const bids = await getBidsByItemId(req.params.itemId);
    res.json({ bids });
};

const createBid = async (req, res) => {
    const { bidAmount } = req.body;
    const item = await getItemById(req.params.itemId);
    if (!item) {
        return res.status(404).send('Item not found');
    }

    if (bidAmount <= item.current_price) {
        return res.status(400).send('Bid amount must be higher than current price');
    }

    const bid = await createBid(req.params.itemId, req.user.id, bidAmount);
    await updateItem(item.id, { current_price: bidAmount });

    // Notify item owner
    const message = `Your item "${item.name}" has a new bid of $${bidAmount}`;
    await createNotification(item.user_id, message);

    // Emit event to update other bidders
    const io = getIo();
    io.emit('bid', { itemId: item.id, bid });

    res.status(201).json({ bid });
};

module.exports = { getBidsByItemId, createBid };
