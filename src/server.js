const app = require('./app');
const { port } = require('./config');
const http = require('http');
const socket = require('./utils/socket');

const server = http.createServer(app);
socket.init(server);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
