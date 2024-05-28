const { createItem, getItemById, getAllItems, updateItem, deleteItem } = require('../models/item');
const { getUserById } = require('../models/user');
const { getIo } = require('../utils/socket');

const getAllItems = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const items = await getAllItems(parseInt(limit), parseInt(offset));
    res.json({ items });
};

const getItemById = async (req, res) => {
    const item = await getItemById(req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json({ item });
};

const createItem = async (req, res) => {
    const { name, description, startingPrice, endTime } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const item = await createItem(name, description, startingPrice, imageUrl, endTime);
    res.status(201).json({ item });
};

const updateItem = async (req, res) => {
    const { name, description, startingPrice, endTime } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const item = await getItemById(req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }

    // Only allow owner or admin to update
    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }

    const updatedItem = await updateItem(req.params.id, name, description, startingPrice, imageUrl, endTime);
    res.json({ updatedItem });
};

const deleteItem = async (req, res) => {
    const item = await getItemById(req.params.id);
    if (!item) {
        return res.status(404).send('Item not found');
    }

    // Only allow owner or admin to delete
    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }

    await deleteItem(req.params.id);
    res.status(204).send();
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
