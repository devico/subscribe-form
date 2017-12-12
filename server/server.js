const http = require('http')
const url = require('url')
const qs = require('querystring')
let validate = require('../server/validation')

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
					let valid = validate(data.username, data.email)
					res.writeHead(200, {'Content-Type': 'application/json'})
					if (valid) {
						res.end(JSON.stringify({ 'status': 'subscribed' }))
					} else {
						res.end(JSON.stringify({ 'status': 'don\'t subscribed' }))
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
