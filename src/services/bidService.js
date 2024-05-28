const { createBid, getBidsByItemId } = require('../models/bid');
const { getItemById, updateItem } = require('../models/item');
const { createNotification } = require('../models/notification');
const { getIo } = require('../utils/socket');

const placeBid = async (itemId, userId, bidAmount) => {
    const item = await getItemById(itemId);
    if (!item) {
        throw new Error('Item not found');
    }

    if (bidAmount <= item.current_price) {
        throw new Error('Bid amount must be higher than current price');
    }

    const bid = await createBid(itemId, userId, bidAmount);
    await updateItem(itemId, item.name, item.description, item.starting_price, item.image_url, item.end_time);

    // Notify item owner
    const message = `Your item "${item.name}" has a new bid of $${bidAmount}`;
    await createNotification(item.user_id, message);

    // Emit event to update other bidders
    const io = getIo();
    io.emit('bid', { itemId: item.id, bid });

    return bid;
};

const getItemBids = async (itemId) => {
    const bids = await getBidsByItemId(itemId);
    return bids;
};

module.exports = { placeBid, getItemBids };
