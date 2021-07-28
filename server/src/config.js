// preload env vars when in development, run: node -r dotenv/config index.js 
import { exec } from 'child_process'
import dotenv from 'dotenv';
dotenv.config();
module.exports = {
  port: process.env.PORT || 7878,
  mySqlUser: process.env.MYSQL_USER || 'pmasu',
  mySqlPass: process.env.MYSQL_PW || '123456',
  mySqlHost: process.env.MYSQL_HOST || 'localhost',
  mySqlDatabase: process.env.MYSQL_DB || 'hello_world'
};