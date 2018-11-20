
const categoryList = [
    { id: 0, name: 'category 0', description: 'some description here'},
    // { id: 1, name: 'category 1' },
    // { id: 2, name: 'category 2' }, 
    // { id: 3,  name: 'category 3'}, 
    // { id: 4,  name: 'category 4' },
    // { id: 5,  name: 'category 5' },
    // { id: 6,  name: 'category 6' },
    // { id: 7,  name: 'category 7' },
    // { id: 8,  name: 'category 8' }, 
  ]; 
    let counter = 0;
    
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
            let reqData = request.payload;
            reqData.id = counter;
            categoryList.push(reqData)
            const response = reply.response(categoryList);
            response.header('Access-Control-Expose-Headers', 'Content-Range');
            response.header('Content-Range','posts : 0-5/' +  + categoryList.length);
            return response;
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
            let query =  JSON.parse(request.query.filter);
            let sort =  JSON.parse(request.query.sort);

            console.log( query)
            console.log( sort)
            let direction = sort[1] == 'ASC' ? 1: -1;
            let arr = query.q ? categoryList.filter((v)=> v.name == query.q) : categoryList;
            arr = arr.sort((a,b) => (a.name > b.name) ? -direction : ((b.name > a.name) ? direction : 0)); 
            arr = arr.slice(range[0], range[1]) 
            const response = reply.response(arr);
            response.header('Access-Control-Expose-Headers', 'Content-Range');
            response.header('Content-Range','posts 0-5/' + categoryList.length);
            return response;
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
            const response = reply.response(categoryList[+request.params.id]);
            response.header('Access-Control-Expose-Headers', 'Content-Range');
            response.header('Content-Range','posts : 0-4/' + categoryList.length);
            return response;
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
            console.log('after splice: ', categoryList);
            const response = reply.response(categoryList);
            response.header('Access-Control-Expose-Headers', 'Content-Range');
            response.header('Content-Range','posts : 0-4/' + categoryList.length);
            return response;
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
            console.log(request.payload);
            categoryList[+request.payload.id] = request.payload;
            // const response = reply(categoryList[request.params.id]);
            const response = reply.response({id: request.payload.id});
            response.header('Access-Control-Expose-Headers', 'Content-Range');
            response.header('Content-Range','posts : 0-4/' +  + categoryList.length);
            return response;
          },
        },
      },
    ];

module.exports = routes;