const http = require('http')
const url = require('url')
const fs = require('fs')
const qs = require('querystring')
const validate = require('../common/validation')

http.createServer(function (req, res) {
  switch (req.url) {
    case '/subscribe':
      if (req.method == 'POST') {
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
      } else {
        res.writeHead(405, {'Content-Type': 'text/html'})
        res.end("405 - Method not supported")
      }
      break
    default:
      res.writeHead(404, {'Content-Type': 'text/html'})
      res.end("404 - Not found")
  }
}).listen(8000)
