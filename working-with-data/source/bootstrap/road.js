module.exports = road => {
  road
    .middleware({
      'data.about'                   : require('../middleware/data/about'),
      'data.home'                    : require('../middleware/data/home'),
      'components.navigation.loaded' : require('../middleware/components/navigation/loaded'),
      'components.home.loaded'       : require('../middleware/components/home/loaded'),
      'components.home.loading'      : require('../middleware/components/home/loading'),
      'components.about.loaded'      : require('../middleware/components/about/loaded'),
      'components.about.loading'     : require('../middleware/components/about/loading'),
    })
    .where('webserver')
      .run('*', 'statics')
      .run('*', 'layouts.default')
    .where('client')
      .run('*', 'events.navigation', 'navigationLoaded')
      .run('/', 'events.home', 'homeLoaded')
    .where('webserver', 'client')
      .run('updateValue', 'log', 'updateType')
      .run('*', 'components.navigation.loaded')
      .run('/', 'components.home.loaded')
      .run('/', 'components.home.loading', 'data')
      .run('/', 'data.home', 'data')
      .run('/', 'components.home.loaded', 'data')
      .run('/about', 'components.about.loading')
      .run('/about', 'data.about')
      .run('/about', 'components.about.loaded')
      .error('components.about.error')
    .where('webserver')
      .done('response');
}
