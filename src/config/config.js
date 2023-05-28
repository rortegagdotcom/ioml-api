import { config } from 'dotenv';
config();

export default {
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'ioml',
  MYSQL_USER: process.env.MYSQL_USER || 'ioml',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '4g6lem]Hg+&vz&N9',
  MYSQL_HOST: process.env.MYSQL_HOST || '192.168.100.82',
  PORT: process.env.PORT || '5748',
};
