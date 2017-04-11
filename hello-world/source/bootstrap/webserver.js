const protocol = require('http');
const server   = protocol.createServer();
const core     = require('lr-core');
const router   = require('lr-server-router')(server);

core('webserver')
  .extension('router', router, true)
  .middleware({
    response : (next, relay, request, response) => {
      response.end('<h1>Hello world</h1>');
    }
  })
  .done('response');

server.listen(8080, function() {
  console.log(`server running on localhost:8080`);
});
