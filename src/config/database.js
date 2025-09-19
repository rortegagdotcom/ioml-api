import mariadb from 'mariadb';
import config from './config';

const connection = mariadb.createConnection({
  user: config.MARIADB_USER,
  host: config.MARIADB_HOST,
  password: config.MARIADB_PASSWORD,
  database: config.MARIADB_DATABASE,
});

const getConnection = () => {
  return connection;
};

const closeConnection = async () => {
  if (connection) {
    (await connection).end;
  }
};

module.exports = {
  getConnection,
  closeConnection,
};
