const { getUserById } = require('../models/user');

const getUserProfile = async (req, res) => {
    const user = await getUserById(req.user.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json({ user });
};

module.exports = { getUserProfile };
