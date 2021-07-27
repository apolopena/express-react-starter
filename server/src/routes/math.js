import express from 'express'

function getMathRoutes() {
  const router = express.Router()
  router.get('/add', add)
  router.get('/subtract', subtract)
  return router
}

async function add(req, res, next) {
  const required = ['a', 'b']
  const missing = required.reduce((acc, val) => {
    if (!req.query.hasOwnProperty(val)) acc.push(val)
    return acc
  }, [])
 if (missing.length > 0) {
   return res.status(400)
    .send({ code: 400, error: `missing parameter${missing.length > 1 ? 's' : ''} ${missing}` })
 }
  const num = {
    a: Number(req.query.a),
    b: Number(req.query.b)
  }
  if (isNaN(num.a)) {
    return res.status(400)
    .send({ code: 400, error: `parameter a: ${req.query.a} is not a number` })
  }
  if (isNaN(num.b)) {
    return res.status(400)
    .send({ code: 400, error: `parameter b: ${req.query.b} is not a number` })
  }
  res.json({
    sum: (num.a + num.b).toString()
  })
}

async function subtract(req, res) {
  const difference = Number(req.query.a) - Number(req.query.b)
  res.send(difference.toString())
}

export {getMathRoutes}