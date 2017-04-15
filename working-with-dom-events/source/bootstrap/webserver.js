const protocol = require('http');
const server   = protocol.createServer();
const router   = require('lr-server-router')(server);
const renderer = require('lr-server-renderer')();
const road 		 = require('lr-main')('webserver')
  .extension('router', router, true)
  .extension('renderer', renderer)
  .middleware({
    'layouts.default' : require('../middleware/layouts/default'),
    response          : require('../middleware/response'),
    statics           : require('../middleware/statics'),
  });

require('./road')(road);

server.listen(8080, function() {
  console.log(`server running on localhost:8080`);
});
