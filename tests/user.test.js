const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { register, login, getProfile } = require('../services/userService');
const { getUserByEmail, createUser, getUserById } = require('../models/user');
const { jwtSecret, jwtExpiresIn } = require('../config');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/user');

describe('User Service', () => {
    describe('register', () => {
        it('should register a new user', async () => {
            const username = 'testuser';
            const password = 'testpassword';
            const email = 'test@example.com';
            const role = 'user';
            const hashedPassword = 'hashedpassword';
            const user = { username, password: hashedPassword, email, role };

            // Mock the bcrypt hash function to return the hashed password
            bcrypt.hash.mockResolvedValue(hashedPassword);

            // Mock the createUser function to return the user
            createUser.mockResolvedValue(user);

            const registeredUser = await register(username, password, email, role);

            expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
            expect(createUser).toHaveBeenCalledWith(username, hashedPassword, email, role);
            expect(registeredUser).toEqual(user);
        });

        it('should throw an error if user already exists', async () => {
            const email = 'existinguser@example.com';

            // Mock the getUserByEmail function to return an existing user
            getUserByEmail.mockResolvedValue({ email });

            await expect(register('testuser', 'testpassword', email)).rejects.toThrow('User already exists');
        });
    });

    describe('login', () => {
        it('should login a user with valid credentials', async () => {
            const email = 'test@example.com';
            const password = 'testpassword';
            const userId = 1;
            const role = 'user';
            const token = 'generatedjwttoken';
            const user = { id: userId, email, password, role };

            // Mock the getUserByEmail function to return the user
            getUserByEmail.mockResolvedValue(user);

            // Mock the bcrypt compare function to return true
            bcrypt.compare.mockResolvedValue(true);

            // Mock the jwt sign function to return the token
            jwt.sign.mockReturnValue(token);

            const authToken = await login(email, password);

            expect(getUserByEmail).toHaveBeenCalledWith(email);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
            expect(jwt.sign).toHaveBeenCalledWith({ id: userId, role }, jwtSecret, { expiresIn: jwtExpiresIn });
            expect(authToken).toEqual(token);
        });

        it('should throw an error for invalid email or password', async () => {
            const email = 'test@example.com';
            const password = 'invalidpassword';

            // Mock the getUserByEmail function to return null
            getUserByEmail.mockResolvedValue(null);

            await expect(login(email, password)).rejects.toThrow('Invalid email or password');
        });
    });

    describe('getProfile', () => {
        it('should get the profile of a user', async () => {
            const userId = 1;
            const user = { id: userId, username: 'testuser', email: 'test@example.com', role: 'user' };

            // Mock the getUserById function to return the user
            getUserById.mockResolvedValue(user);

            const userProfile = await getProfile(userId);

            expect(getUserById).toHaveBeenCalledWith(userId);
            expect(userProfile).toEqual(user);
        });

        it('should throw an error if user is not found', async () => {
            const userId = 999;

            // Mock the getUserById function to return null
            getUserById.mockResolvedValue(null);

            await expect(getProfile(userId)).rejects.toThrow('User not found');
        });
    });
});
