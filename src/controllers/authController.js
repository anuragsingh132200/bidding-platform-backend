const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/user');
const { jwtSecret, jwtExpiresIn } = require('../config');

const register = async (req, res) => {
    const { username, password, email, role } = req.body;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser(username, hashedPassword, email, role || 'user');
    res.status(201).json({ user });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password');
    }

    // Generate token
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
    res.json({ token });
};

module.exports = { register, login };
