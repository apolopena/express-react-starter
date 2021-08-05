import mysql from 'mysql2/promise'

import { mySqlPoolConfig as defaultConfig } from '../config'

let _pool = null, config = null
const e_msg_prefix = 'The mysql connection pool Singleton'

class MySqlPoolReinitializationError extends Error {
  constructor() {
    super(`${e_msg_prefix} has already been initialized and cannot be reinitialized.`)
    this.name = 'MySqlPoolReinitializationError'
    Error.captureStackTrace(this, MySqlPoolReinitializationError)
  }
}

class MySqlPoolNotInitializedError extends Error {
  constructor() {
    super(`${e_msg_prefix} and has not been initialized.`)
    this.name = 'MySqlPoolNotInitializedError'
    Error.captureStackTrace(this, MySqlPoolNotInitializedError)
  }
}

const initialize = (cfg = mySqlPoolConfig) => {
  if (_pool) throw new MySqlPoolReinitializationError()
  config = cfg
  _pool = mysql.createPool(cfg)
  return _pool
}

const getConfig = () => {
  return config
}

const getDefaultConfig = () => {
  return defaultConfig
}

const pool = {
  get: () => {
    if (!_pool) throw new MySqlPoolNotInitializedError()
    return _pool
  }
}

module.exports = { 
  initialize, 
  getConfig,
  getDefaultConfig,
  pool
}
