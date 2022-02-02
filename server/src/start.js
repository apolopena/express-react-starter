import path from 'path'

import express from 'express'
import 'express-async-errors'
import mysql from 'mysql2'
import logger from 'loglevel'
import {
  mySqlUser,
  mySqlPass,
  mySqlHost,
  mySqlDatabase
} from './config'
import { getRoutes } from './routes'


async function connectDB(host = '', user = '', password = '', database = '') {
  const config = {
    host: host || mySqlHost || 'defaultHost',
    user: user || mySqlUser || 'defaultUser',
    password: password || mySqlPass || 'defaultPassword',
    database: database || (mySqlDatabase ? mySqlDatabase : 'defaultDatabase')
  }
  const c = mysql.createConnection(config)

  return new Promise((resolve, reject) => {
    c.connect(err => err ? reject(err) : resolve(c))
  })
  
}

function startServer(port = process.env.PORT || 7777, host = 'localhost') {
  const app = express()

  app.use(express.static(path.join(__dirname,'../../client/build')));
  app.use('/api', getRoutes())
  app.use(errorMiddleware)

  return new Promise((resolve) => {
    const server = app.listen(port, host, () => {
      logger.info(`Express Server is listening on port ${server.address().port}`)
      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose)
        })
      }
      setupCloseOnExit(server)
      resolve(server)
    })
  })
}

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
      // Add a stack property only in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
}

function setupCloseOnExit(server) {
  // Handler for process events
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed ', options)
      })
      .catch((e) => {
        logger.warn('something went wrong closing the server', e.stack)
      })
    // eslint-disable-next-line no-process-exit
    if (options.exit) process.exit()
  }

  // Handle gracefull exit
  process.on('exit', exitHandler.bind(null, {eventType: 'EXIT'}))

  // Handle ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {exit: true, eventType: 'SIGINT'}))

  // Handle "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, {exit: true, eventType: 'SIGUSR1'}))
  process.on('SIGUSR2', exitHandler.bind(null, {exit: true, eventType: 'SIGUSR2'}))

  // Handle uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, {exit: true, eventType: 'UNCAUGHT_EXCEPTION'}))
}

export {startServer, connectDB}