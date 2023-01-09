import mysql from "mysql2/promise";
import config from "./config";

export async function createConnection() {
  const connection = await mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
  });
  return connection;
}