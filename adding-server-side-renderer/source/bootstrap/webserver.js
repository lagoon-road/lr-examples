const protocol = require('http');
const server   = protocol.createServer();
const core     = require('lr-core');
const router   = require('lr-server-router')(server);
const renderer = require('lr-server-renderer')();
const debug    = require('../extensions/debug');

core('webserver')
  .extension('router', router, true)
  .extension('renderer', renderer)
  .extension('debug', debug)
  .middleware({
    log                     : require('../middleware/debug'),
    response                : require('../middleware/response'),
    'components.home'       : require('../middleware/components/home'),
    'components.navigation' : require('../middleware/components/navigation'),
    'components.contact'    : require('../middleware/components/contact'),
    'layouts.default'       : require('../middleware/layouts/default'),
  })
  .run('*', 'log')
  .run('*', 'layouts.default')
  .run('*', 'components.navigation')
  .run('/', 'components.home')
  .run('/contact', 'components.contact')
  .done('response');

server.listen(8080, function() {
  console.log(`server running on localhost:8080`);
});
