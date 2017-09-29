var express = require('express')
var bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let devRouter = require('./build/dev-router.js')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) // 以下为路由配置
app.use(cookieParser())

app.use(devRouter)
app.use(require('connect-history-api-fallback')())
app.use(express.static('./dist'))

module.exports = app.listen(8093, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost: 8093 \n')
})
