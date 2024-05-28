const { getNotificationsByUserId, markNotificationsAsRead } = require('../models/notification');

const getNotifications = async (req, res) => {
    const notifications = await getNotificationsByUserId(req.user.id);
    res.json({ notifications });
};

const markNotificationsAsRead = async (req, res) => {
    await markNotificationsAsRead(req.user.id);
    res.status(200).send('Notifications marked as read');
};

module.exports = { getNotifications, markNotificationsAsRead };
