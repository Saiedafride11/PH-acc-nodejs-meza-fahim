// local module
const {name, add} = require('./other');

// core module
const http = require('http');

// third party modules underscore.js
const _ = require('underscore');

const server = http.createServer(function(req, res){
      console.log("Server is running");
})

server.listen(5000)
console.log(name);
console.log(add(5, 5));



var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
const underScoreResult = _.pluck(stooges, "name");
console.log(underScoreResult);