const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret, jwtExpiresIn } = require('../config');
const { getUserByEmail, createUser } = require('../models/user');

const register = async (username, password, email, role) => {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser(username, hashedPassword, email, role || 'user');
    return user;
};

const login = async (email, password) => {
    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid email or password');
    }

    // Generate token
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
    return token;
};

module.exports = { register, login };
