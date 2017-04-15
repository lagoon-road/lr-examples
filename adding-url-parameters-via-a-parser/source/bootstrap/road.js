const debug  = require('../extensions/debug');
const parser = require('lr-url-parser')();

module.exports = road => {
  road
    .parser(parser)
    .extension('debug', debug)
    .middleware({
      debug                   : require('../middleware/debug'),
      'components.navigation' : require('../middleware/components/navigation'),
      'components.home'       : require('../middleware/components/home'),
      'components.contact'    : require('../middleware/components/contact')
    })
    .where('webserver')
      .run('*', 'debug')
      .run('*', 'statics')
      .run('*', 'layouts.default')
    .where('client')
      .run('nav', 'events.navigation', 'domReady')
    .where('webserver', 'client')
      .run('*', 'components.navigation')
      .run('/', 'components.home')
      .run('/params/:id', 'components.home')
      .run('/contact', 'components.contact')
    .where('webserver')
      .done('response');
}
