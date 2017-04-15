# Working with data

In our last big example we will put everything together and add data loading to the mix.

##### working-with-data/source/bootstrap/client.js
```
require("babel-polyfill");
const router     = require('lr-client-router');
const renderer   = require('lr-client-renderer');
const httpClient = require('../extensions/httpClient')('http://eol.org/api/');
const road       = require('lr-main')('client')
  .extension('router', router, true)
  .extension('renderer', renderer, true)
  .extension('httpClient', httpClient)
  .middleware({
    'events.navigation' : require('../middleware/events/navigation'),
    'events.home'       : require('../middleware/events/home')
  });

require('./road')(road);
```

We made two changes to this file

```
require("babel-polyfill");
```

We added the polyfill so we can use async and await on the client. We will see in the data middleware in a moment how. Furthermore we added the `httpClient` middleware to the road. We added this also to the `webserver.js` file.


##### working-with-data/source/middleware/data/about.js
```
module.exports = async function(next, relay) {
  const path  = 'pages/1.0.json?id=1048601&details=true';
  const data  = await relay.extensions.httpClient.get(path);
  const about = JSON.parse(data.text).dataObjects.shift().description;
  const state = Object.assign({}, relay.state ? relay.state : {}, { about });
  next({ state });
}

```

We added a new middleware function that loads data from Encyclopedia of Life about the Masked Booby, the bird in the logo, for the people who are not an ornithologist by profession. As you can see it is an `async function` so we can wait until the data is loaded. There is no need for a `try...catch` block because any error will be catched by the core and trigger the error middleware if available, otherwise it with output the error to the console. The error will be available at `relay.error`.

The result will be passed to the next middleware function as a `state` property on the relay object, so we can use it in the template.

##### working-with-data/source/middleware/components/about/loading.js

```
module.exports = (next, relay) => {
  relay.extensions.renderer.render('
    <section id="about" data-lr="loading">Loading...</section>
  ', '.content');
  next();
}
```

We added a loading template for when the data is not available yet.


##### working-with-data/source/middleware/components/about/loaded.js

```
module.exports = (next, relay, request) => {
  relay.extensions.renderer.render('
    <section id="about" data-lr="loaded">
      <h1>About the masked booby</h1>
      <p>\$\{ relay.state.about \}</p>
    </section>
  ', '.content');
  next();
}

```

Once the data is available we will render the `loaded` template with the data.


##### working-with-data/source/bootstrap/road.js

```
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
      .run('/error', 'fail')
      .run('/about', 'components.about.loading')
      .run('/about', 'data.about')
      .run('/about', 'components.about.loaded')
      .error('components.about.error')
    .where('webserver')
      .done('response');
}
```

This is the `road.js` file and the code we will focus on is the following

```
.run('/about', 'components.about.loading')
.run('/about', 'data.about')
.run('/about', 'components.about.loaded')

```

We have the templates added in the right order with the data loading middleware right in between. That is it, data loading made easy.

### Loading data on a click

There is also an example in the code how to load data on a click, which is another very common use case. 

```
module.exports = (next, relay) => {
  document.querySelector('button').addEventListener('click', event => {
    event.preventDefault();
    relay.update({ matchValue : window.location.pathname, updateType : 'data' });
  });
  next();
}
```

Whenever you need to load data on click you just call the `update` method in the event middleware, call it with the route that you are on and a unique `updateType`. It will trigger the right middleware again as you can see in the `road.js` file. It basically does the exact same thing as loading the data on a page load.

> Data is now loaded on every page request, that is obviously not wath you normally want. It is easy to add a check if `relay.state.about` already exists and if not load the data. Just make sure you have set the `resetUpdateCycle` to `false` so the relay data stays intact after an update event

Next: [Writing a parser](/guide/writing-parsers)
