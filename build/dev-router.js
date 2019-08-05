var express = require('express')
var { REMOTE_ADDRESS } = require('../config')
var { Dispatcher } = require('./dev-dispatch')
const { isPcEnable, token }  = require('../config/pc.dev')
const { postLogger } = require('./utils')

const REQUEST_METHOD_POST = 'POST'

var router = express.Router()
var dispatcher = new Dispatcher()

router.post('/dispatcher', function (req, res, next) {
  var DispatcherBody = req.body
  if (DispatcherBody.method === REQUEST_METHOD_POST) {
    let url = REMOTE_ADDRESS + DispatcherBody.path
    let json = DispatcherBody.data
    let contentType = DispatcherBody.contentType
    if (isPcEnable) {
      json.token = token
    } else {
      json.token = req.cookies.token || json.token
    }
    postLogger(url, json)
    dispatcher.post(url, json, (resp) => {
      res.send(resp)
      res.end()
    }, contentType || 'FORM')
  } else {
    dispatcher.get(REMOTE_ADDRESS + requestBody.path, function (resp) {
      res.send(resp)
      res.end()
    })
  }
})

router.get('/dispatcher', function (req, res, next) {
  dispatcher.get(REMOTE_ADDRESS + '/access_token', function (resp) {
    res.send(resp)
    res.end()
  })
})

module.exports = router
