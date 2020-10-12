const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: process.argv[2],
  password: process.argv[3],
  database: process.argv[4],
};
const connection = mysql.createConnection(config);
connection.connect();

module.exports = connection;
