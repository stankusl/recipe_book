// Server Configuration for Node Server.
var express = require('express');
var modRewrite = require('connect-modrewrite');

var server = express();
server.use( modRewrite([
      '!\\.\\w+$ /index.html [L]'
]));
server.use('/', express.static(__dirname + '/build'));
server.listen(888);
