import { startServer, connectDB } from '../../src/start'
import request from 'supertest'
import logger from 'loglevel'
import {
  mySqlHost,
  mySqlDatabase
} from '../../src/config'

const logLevel = logger.levels.WARN
const file = `${__filename}`.match(/test\/integration.*$/)[0]
const config = {
  port: 9999, 
  host: 'localhost'
}

let server, baseUrl

logger.setLevel(logLevel)
Object.freeze(config)

describe(`${file}`, function() {
  describe('server', function() {
    beforeEach(async () => {
      server = await startServer(config)
    })
    afterEach( async() => {
      process.emit('exit') && process.removeAllListeners('exit')
    })
    it('starts', function start(done) {
      done()
    })
    it('responds with 200 to /', function testSlash(done) {
      request(server)
        .get('/')
        .expect(200, done)
    })
    it('responds with 404 to /does_not_exist', function testPath(done) {
      request(server)
        .get('/does_not_exist')
        .expect(404, done)
    })
  })
  describe('mysql', function() {
    let conn, dbName
    beforeEach(async () => {
      conn = await connectDB()
    })
    it (`connects to '${mySqlDatabase}' database on '${mySqlHost}'`, async ()=>{
      conn && conn.end()
    })
    it(`disconnects from '${mySqlDatabase}' database on '${mySqlHost}'`, async () => {
      conn && conn.end()
    })
  })
})
