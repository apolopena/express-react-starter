// preload env vars when in development, run: node -r dotenv/config index.js 
import { exec } from 'child_process'
import dotenv from 'dotenv';
dotenv.config();

const fallback = {
  user: 'pmasu',
  pass: '123456',
  host: 'localhost',
  database: 'hello_world'
}
const cfg = {
  port: process.env.PORT || 7878,
  mySqlUser: process.env.MYSQL_USER || fallback.user,
  mySqlPass: process.env.MYSQL_PW || fallback.pass,
  mySqlHost: process.env.MYSQL_HOST || fallback.host,
  mySqlDatabase: process.env.MYSQL_DB || fallback.database,
}
module.exports = {
  port: cfg.port,
  mySqlUser: cfg.mySqlUser,
  mySqlPass: cfg.mySqlPass,
  mySqlHost: cfg.mySqlHost,
  mySqlDatabase: cfg.mySqlDatabase,
  mySqlPoolConfig: {
    connectionLimit: 150,
    host: process.env.MYSQL_POOL_HOST || cfg.mySqlHost,
    user: process.env.MYSQL_POOL_USER || cfg.mySqlUser,
    password: process.env.MYSQL_POOL_PW || cfg.mySqlPass,
    database: process.env.MYSQL_POOL_DB || cfg.mySqlDatabase
  }
};