const { createNotification, getNotificationsByUserId, markNotificationsAsRead } = require('../models/notification');

const notifyUser = async (userId, message) => {
    const notification = await createNotification(userId, message);
    return notification;
};

const getUserNotifications = async (userId) => {
    const notifications = await getNotificationsByUserId(userId);
    return notifications;
};

const markUserNotificationsAsRead = async (userId) => {
    await markNotificationsAsRead(userId);
};

module.exports = { notifyUser, getUserNotifications, markUserNotificationsAsRead };
