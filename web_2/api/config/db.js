const mysql  = require('mysql2/promise');
const config = require('./config');

// Pool de conexiones: se reutilizan en vez de abrir una por request
const pool = mysql.createPool({
    host:            config.db.host,
    port:            config.db.port,
    database:        config.db.database,
    user:            config.db.user,
    password:        config.db.password,
    waitForConnections: true,
    connectionLimit:    10,
});

module.exports = pool;
