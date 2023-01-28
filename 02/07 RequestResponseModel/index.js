// local module
const other = require('./other');

// core module
const http = require('http');
const PORT = 5000;

// const res = other.subtract(7, 5);
// console.log(res);


const server = http.createServer((req, res) => {
      // console.log(req.url);
      if(req.url === '/'){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write('<p>This is Home Page</p>');
            res.end();
      }
      else if(req.url === '/about'){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write('<p>This is About Page</p>');
            res.end();
      }

      else if(req.url === '/json'){
            res.writeHead(200, {'Content-Type':'application/json'});
            res.write(JSON.stringify({course: "ACC"}));
            res.end();
      }
})

server.listen(PORT)
console.log(`Server is running at ${PORT}`)
