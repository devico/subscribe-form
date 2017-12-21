const http = require('http')
const url = require('url')
const qs = require('querystring')
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')
const validate = require('../common/validation')

const serve = serveStatic('../public', {'index': ['index.html', 'index.htm']})

const server = http.createServer(function onRequest(req, res) {
  if (req.method == "POST" && req.url == "/subscribe") {
    let body = ''
    req.on('data', function(chunk) {
      body += chunk
    })
    req.on('end', function () {
      let data = qs.parse(body)
      let username = data.username
      let email = data.email
      let valid = validate({username, email})
      res.writeHead(200, {'Content-Type': 'application/json'})
      if (valid) {
        res.end(JSON.stringify({ 'status': 'subscribed' }))
      } else {
        res.end(JSON.stringify({ 'status': 'did not subscribe' }))
      }
    })
  } else if (req.method == "GET" && req.url == "/") {
    serve(req, res, finalhandler(req, res))
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end("404 - Not found")
  }
})

server.listen(8000)
