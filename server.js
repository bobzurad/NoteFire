var express = require('express');
var server = express();
var server2 = express();

server.use('/', express.static(__dirname + '/app'));
server.listen(8001);
console.log("app being served on http://localhost:8001");

server2.use('/', express.static(__dirname + '/_deploy'));
server2.listen(8002);
console.log("_deploy being served on http://localhost:8002");
