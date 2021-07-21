// preload env vars when in development, run: node -r dotenv/config index.js 
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT
};