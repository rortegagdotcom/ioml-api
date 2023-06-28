import mysql from 'mysql2/promise';
import config from './config';

const connection = mysql.createConnection({
  user: config.MYSQL_USER,
  host: config.MYSQL_HOST,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection,
};
