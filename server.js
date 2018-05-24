const path = require('path')
const express = require('express')
const port = process.env.PORT || 8080
const app = express()

global.apiRoutes = express.Router()

app.use(express.static(__dirname + '/public'))

require('./api/routes')(app)

app.listen(port, () => {
  console.log(port)
})
