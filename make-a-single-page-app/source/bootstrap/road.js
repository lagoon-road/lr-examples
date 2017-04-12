const debug = require('../extensions/debug');

module.exports = road => {
  road
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
    .where('webserver', 'client')
      .run('*', 'components.navigation')
      .run('/', 'components.home')
      .run('/contact', 'components.contact')
      .done('response');
}
