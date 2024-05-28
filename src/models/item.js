const pool = require('../utils/db');

const createItem = async (name, description, startingPrice, imageUrl, endTime) => {
    const result = await pool.query(
        'INSERT INTO items (name, description, starting_price, image_url, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, description, startingPrice, imageUrl, endTime]
    );
    return result.rows[0];
};

const getItemById = async (id) => {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0];
};

const getAllItems = async (limit, offset) => {
    const result = await pool.query('SELECT * FROM items LIMIT $1 OFFSET $2', [limit, offset]);
    return result.rows;
};

const updateItem = async (id, name, description, startingPrice, imageUrl, endTime) => {
    const result = await pool.query(
        'UPDATE items SET name = $1, description = $2, starting_price = $3, image_url = $4, end_time = $5 WHERE id = $6 RETURNING *',
        [name, description, startingPrice, imageUrl, endTime, id]
    );
    return result.rows[0];
};

const deleteItem = async (id) => {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
};

module.exports = { createItem, getItemById, getAllItems, updateItem, deleteItem };
