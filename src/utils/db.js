const { Pool } = require('pg');
const { db } = require('../config');

const pool = new Pool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port,
});

module.exports = pool;
