const server = require('express')()
server.all('*')

module.exports = () => server.listen(3000)