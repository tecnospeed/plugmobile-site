const controller = require('./controller')

module.exports = (app) => {
  app.get('/api/v1/ciranda', controller.ultimasPublicacoes)

  app.get('*', function (req, res) {
    res.sendfile('./public/index.html')
  })

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET')
    res.header('Access-Control-Allow-Origin', 'http://localhost')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}
