const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER || 'root',
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'StoreManager',
  });
  module.exports = connection;
// MYSQL_USER=root
// MYSQL_PASSWORD=password
// MYSQL_HOSTNAME=localhost
// MYSQL_DATABASE=StoreManager
// MYSQL_PORT=3306
// PORT=3001