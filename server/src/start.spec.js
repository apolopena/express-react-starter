import { startServer, connectDB } from './start'
import request from 'supertest'
import logger from 'loglevel'
import {
  mySqlHost,
  mySqlDatabase
} from './config'

const logLevel = logger.levels.WARN
const file = `${__filename}`.match(/src.*$/)[0].replace('spec.', '')
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
      //baseUrl = `http://${server.address().address}:${server.address().port}/api`
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

/*
        //var sql = "CREATE TABLE test (name VARCHAR(255), address VARCHAR(255))";
        //var sql = "INSERT INTO test(name, address) VALUES('test name', 'test address')"
        var sql = `SELECT * FROM information_schema.tables WHERE table_schema = 'flashcards' AND table_name = 'test' LIMIT 1;`
        conn.query(sql, function (err, result, fields) {
          if (err) throw err;
          console.log("table status", result);
        });
*/