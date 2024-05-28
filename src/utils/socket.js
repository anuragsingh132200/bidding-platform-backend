const socketIo = require('socket.io');
let io;

module.exports = {
    init: (server) => {
        io = socketIo(server);
        io.on('connection', (socket) => {
            console.log('New client connected');
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket.io not initialized');
        }
        return io;
    },
};
