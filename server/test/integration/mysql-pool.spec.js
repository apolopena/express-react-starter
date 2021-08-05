require ('should')

import { exec } from 'child_process'
import sinon from 'sinon'
import logger from 'loglevel'

import { 
  initialize as initPool,
  getDefaultConfig as getDefaultPoolCfg
} from '../../src/db/mysql-pool'

// toggle to true to show connection pool flow console logs
const showTraces = false
// The number of connections to exceed the connection limit by
const threshold = 15
const file = `${__filename}`.match(/test\/integration.*$/)[0]

async function fetchMaxConnections () {
  // If we are on the gitpod platform we dont use sudo.
  // So assume only Gitpod will have system root of 'workspace
  const systemRoot = process.cwd().split('/')[1]
  const sqlCmdPrefix = (systemRoot == 'workspace')
    ? 'mysql' 
    : ("sudo -p; mysql -u root -p" + `${getDefaultPoolCfg().password}`)
  const sqlCmd = sqlCmdPrefix
    + " -e \"show variables like \\\"max_connections\\\";\" | grep -o '[[:digit:]]*'"
    
  return await new Promise((resolve, reject) => {
    exec(sqlCmd, function(err, stdout) {
      if (err) throw err
      resolve(Number(stdout))
    });
  })
}

// Why does this need to be here to trigger the 'main'' describe?
// this is not the case if this file is put next to its source (src/db/mysql-pool.js)
describe(`${file}`, () => {
  it(`Fetches max_connections from mysqld`, async () => {
    try { await fetchMaxConnections() } catch (e) { throw e }
  })
})

// Main test
fetchMaxConnections().then( (maxConnections) => {
  let cnt = 0
  let poolCfg = getDefaultPoolCfg()
  // subtract 1 since mysqld allows 1 extra connection for administration purposes
  poolCfg.connectionLimit = maxConnections - 1

  const pool = initPool(poolCfg)
  const MSG_ENQUEUE = 'Waiting for an available connection slot'
  const logLevel = logger.levels.WARN
  const testMsg = (
    `At least ${threshold} mysql connections are queued when the mysql 'max_connections' ` +
    `limit of ${maxConnections} is exceeded by ${threshold}`
  )

  const connectionCb = (connection) => {
    console.log(`mysql connection ${++cnt} - Connection id: ${connection.threadId} connected`)
  }
  const enqueueCb = (connection) => {
    console.log(MSG_ENQUEUE)
  }
  const releaseCb = (connection) => {
    console.log(`Connection id: ${connection.threadId} released`);
  }

  describe(`${file}`, function () {
    before ( () => {
      logger.setLevel(logLevel)
      pool.on('enqueue', enqueueCb)
      pool.on('connection', connectionCb)
      pool.on('release', releaseCb)
    })

    after ( () => {
      cnt = 0
      pool.removeListener('connection', connectionCb)
      pool.removeListener('enqueue', enqueueCb)
      pool.removeListener('release', releaseCb)
    })

    beforeEach( () => {
      // stub the console log in order to capture stdout from async operations
      sinon.stub(console, "log").returns(void 0)
    })

    afterEach( () => {
      // Restore console just in case it somehow didn't happen
      console.log.restore && console.log.restore()
    })

    it (testMsg, (done) => {
      let promises = []
      for (let i = 1; i < maxConnections + threshold; i++) {
        promises.push(pool.query('SELECT 1 + 1 AS solution'))
      }
      
      Promise.all(promises)
      .then( () => {
        pool.end().catch(err => done(err))
        let stdouts = console.log.args
        console.log.restore();
        if (showTraces) console.log(String(stdouts.flat()).split(',').join('\n'))
        try {
          for (let i = 0; i < threshold; i++) {
            stdouts[i][0].should.equal(MSG_ENQUEUE)
          }
        } catch (err) { return done(err) }
        done()
      })
      .catch((err) => { 
        console.log.restore()
        done(err) 
      })
      
    })
  })
})

