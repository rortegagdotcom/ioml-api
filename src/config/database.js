import mysql from "mysql2/promise";
import config from "./config";

const connection = mysql.createConnection({
  host: config.MYSQL_HOST,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
});

const getConnection = () => {
  return connection;
};

export default getConnection;