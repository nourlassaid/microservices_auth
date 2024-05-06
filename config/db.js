const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'formation_management'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
