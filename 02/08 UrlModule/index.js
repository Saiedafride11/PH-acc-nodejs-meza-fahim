// local module
const other = require('./other');

// core module
const http = require('http');
const PORT = 5000;

const url = require('url');
// console.log(url)

const server = http.createServer((req, res) => {
      const address_url = "http://localhost:5000/contact?name=afride&country=bangladesh";

      const parsed_url = url.parse(address_url, true);
      console.log(parsed_url);

      const queryObject = parsed_url.query;
      console.log(queryObject);
})

server.listen(PORT)
console.log(`Server is running at ${PORT}`)


//contact?name=afride&country=bangladesh
