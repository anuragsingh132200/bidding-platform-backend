const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config');
const { getUserByEmail, createUser, getUserById } = require('../models/user');

const register = async (username, password, email, role = 'user') => {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await createUser(username, hashedPassword, email, role);
    return user;
};

const login = async (email, password) => {
    // Find the user by email
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
    return token;
};

const getProfile = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = { register, login, getProfile };
