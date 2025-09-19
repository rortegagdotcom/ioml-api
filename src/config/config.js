import { config } from 'dotenv';

config();

export default {
  MARIADB_DATABASE: process.env.MARIADB_DATABASE,
  MARIADB_USER: process.env.MARIADB_USER,
  MARIADB_PASSWORD: process.env.MARIADB_PASSWORD,
  MARIADB_HOST: process.env.MARIADB_HOST,
  PORT: process.env.PORT,
};
