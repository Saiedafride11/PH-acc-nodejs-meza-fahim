// local module
const other = require('./other');

// core module
const http = require('http');
const PORT = 5000;

// const res = other.subtract(7, 5);
// console.log(res);


const server = http.createServer((req, res) => {
      res.end("Hello nodejs")
})

server.listen(PORT)
console.log(`Server is running at ${PORT}`)
