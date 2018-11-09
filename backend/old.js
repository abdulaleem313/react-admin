'use strict';

const hapi = require('hapi');
const server = new hapi.Server();
const categoryList = [
{ id: 0, name: 'category 0'},{ id: 1, name: 'category 1' },
{ id: 2, name: 'category 2 ' }, {id: 3,  name: 'category 3'}, 
{id: 4,  name: 'category 4' } ]; 
let counter = 8;
let routes = [
  {
    method: 'post',
    path: '/categories',
    config: {
      description: 'categories',
      notes: 'categories',
      tags: ['api', 'base'],
      auth: false,
      handler: function (request, reply) { 
        console.log('payload', request.payload)
        counter++;
        categoryList.push({ id: counter, name:  request.payload.name })
        const response = reply(categoryList);
        response.header('Access-Control-Expose-Headers', 'Content-Range');
        response.header('Content-Range','posts : 0-5/' +  + categoryList.length);
      },
    },
  },
  {
    method: 'GET',
    path: '/categories',
    config: {
      description: 'categories',
      notes: 'categories',
      tags: ['api', 'base'],
      auth: false,
      handler: function (request, reply) {
        console.log(request.query)
        let range = JSON.parse(request.query.range)
        console.log( range)
        const response = reply(categoryList.slice(range[0], range[1] + 1));
        response.header('Access-Control-Expose-Headers', 'Content-Range');
        response.header('Content-Range','posts 0-5/' + categoryList.length);
      },
    },
  },
  {
    method: 'GET',
    path: '/categories/{id}',
    config: {
      description: 'categories',
      notes: 'categories',
      tags: ['api', 'base'],
      auth: false,
      handler: function (request, reply) {
        console.log(request.params);
        const response = reply(categoryList[request.params.id]);
        response.header('Access-Control-Expose-Headers', 'Content-Range');
        response.header('Content-Range','posts : 0-4/' + categoryList.length);
      },
    },
  },
  {
    method: 'delete',
    path: '/categories/{id}',
    config: {
      description: 'categories',
      notes: 'categories',
      tags: ['api', 'base'],
      auth: false,
      handler: function (request, reply) {
        console.log(request.params);
        categoryList.splice(request.params.id, 1);
        const response = reply(categoryList[request.params.id]);
        response.header('Access-Control-Expose-Headers', 'Content-Range');
        response.header('Content-Range','posts : 0-4/' + categoryList.length);
      },
    },
  },
  {
    method: 'put',
    path: '/categories/{id}',
    config: {
      description: 'categories',
      notes: 'categories',
      tags: ['api', 'base'],
      auth: false,
      handler: function (request, reply) {
        // console.log(request.payload);
        // categoryList[request.params.id].name = request.payload.name;
        // const response = reply(categoryList[request.params.id]);
        const response = reply(categoryList);
        response.header('Access-Control-Expose-Headers', 'Content-Range');
        response.header('Content-Range','posts : 0-4/' +  + categoryList.length);
      },
    },
  },
];

server.connection({
  port: 3333, labels: ['api'], routes: {cors: true},
});

server.route(routes);
  server.start(function () {
  });
module.exports = server; // TODO: remove after usage
