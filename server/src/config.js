// preload env vars when in development, run: node -r dotenv/config index.js 
import { exec } from 'child_process'
import dotenv from 'dotenv';
dotenv.config();
module.exports = {
  port: process.env.PORT,
  mySqlUser: process.env.MYSQL_USER,
  mySqlPass: process.env.MYSQL_PW,
  mySqlHost: process.env.MYSQL_HOST || exec("gp url", (err, stdout, stderr) => {
    if (err) {
      console.log("error executing gp")
      return ""
    }
    return stdout
  }),
  mySqlDatabase: process.env.MYSQL_DB
};