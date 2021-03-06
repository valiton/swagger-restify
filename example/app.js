'use strict';

var restify = require('restify'),
    swagger = require('../index'),
    api = require('./api');

var port = process.env.NODE_PORT || 8080;

var server = restify.createServer({
    name: 'configRest'
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.bodyParser({ mapParams: false }));

restify.defaultResponseHeaders = function(data) {
    this.header('Access-Control-Allow-Origin', '*');
};

server.get('/login', api.login);

swagger.init(server, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:' + port,
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public',
    apis: ['./api.js', './api.coffee', './api.yml']
});

server.listen(port);
console.log('server is ready on port', port);
