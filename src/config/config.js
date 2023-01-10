import { config } from 'dotenv';
config();

export default {
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "ioml",
  MYSQL_USER: process.env.MYSQL_USER || "root",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "P@ssW0rd",
  MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
  PORT: process.env.PORT || "5748",
};
