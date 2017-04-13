const debug = require('../extensions/debug');

module.exports = road => {
  return road
    .extension('debug', debug)
    .middleware({
      debug                   : require('../middleware/debug'),
      'components.navigation' : require('../middleware/components/navigation'),
      'components.home'       : require('../middleware/components/home'),
      'components.about'      : require('../middleware/components/about'),
      'components.fail'       : require('../middleware/components/fail'),
      'components.error'      : require('../middleware/components/error'),
      'components.loading'    : require('../middleware/components/loading'),
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
      .run('/about', 'components.loading')
      .run('/about', 'components.about')
      .run('/error', 'components.fail')
      .error('components.error')
    .where('webserver')
      .done('response');
}
