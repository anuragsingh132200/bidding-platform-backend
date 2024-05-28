const { createItem, getItemById, getAllItems, updateItem, deleteItem } = require('../models/item');

const createNewItem = async (name, description, startingPrice, imageUrl, endTime, userId) => {
    const item = await createItem(name, description, startingPrice, imageUrl, endTime);
    return item;
};

const getAllAuctionItems = async (limit, offset) => {
    const items = await getAllItems(limit, offset);
    return items;
};

const getSingleItem = async (id) => {
    const item = await getItemById(id);
    if (!item) {
        throw new Error('Item not found');
    }
    return item;
};

const updateAuctionItem = async (id, name, description, startingPrice, imageUrl, endTime, userId) => {
    const item = await getItemById(id);
    if (!item) {
        throw new Error('Item not found');
    }

    // Only allow owner or admin to update
    if (item.user_id !== userId && userId !== 'admin') {
        throw new Error('Access denied');
    }

    const updatedItem = await updateItem(id, name, description, startingPrice, imageUrl, endTime);
    return updatedItem;
};

const deleteAuctionItem = async (id, userId) => {
    const item = await getItemById(id);
    if (!item) {
        throw new Error('Item not found');
    }

    // Only allow owner or admin to delete
    if (item.user_id !== userId && userId !== 'admin') {
        throw new Error('Access denied');
    }

    await deleteItem(id);
};

module.exports = { createNewItem, getAllAuctionItems, getSingleItem, updateAuctionItem, deleteAuctionItem };
