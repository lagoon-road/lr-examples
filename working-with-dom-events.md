# Working with DOM events

In this guide we will do a simple `console.log` from our event middleware that will show you that the DOM is ready to be accessed.

##### working-with-dom-events/source/middleware/events/navigation.js
```
module.exports = (next, relay) => {
  console.log(\`There are \$\{ document.querySelector(\'nav\').children.length \} menu items\`);
  next();
}
```

Just a regular middleware function that should give is the number of menu items.

##### working-with-dom-events/source/middleware/bootstrap/client.js
```
const router   = require('lr-client-router');
const renderer = require('lr-client-renderer');
const road     = require('lr-main')('client')
  .extension('router', router, true)
  .extension('renderer', renderer, true)
  .middleware({
    'events.navigation' : require('../middleware/events/navigation')
  });

require('./road')(road);
```

We have added the middleware to the client, this is obviously because it should only be used on the clientside.

##### working-with-dom-events/source/middleware/bootstrap/road.js
```
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
    .where('client')
      .run('*', 'events.navigation', 'navigationLoaded')
    .where('webserver', 'client')
      .run('*', 'components.navigation')
      .run('/', 'components.home')
      .run('/contact', 'components.contact')
    .where('webserver')
      .done('response');
}
```

We added a new hook to the road

```
.run('*', 'events.navigation', 'navigationLoaded')
```

As you can see we added a custom `updateType`. This is an update type that the client side router triggers whenever a file has been added to the DOM. How it is constructed we will see after we have looked at the navigation template middleware.

##### working-with-dom-events/source/middleware/middleware/components/navigation.js

```
module.exports = (next, relay, request) => {
  relay.extensions.debug('Rendering component navigation: ' + request.url);
  relay.extensions.renderer.render('
    <ul id="navigation" data-lr="loaded">
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  ', 'nav');
  next();
}
```

We added an `id` and a `data-lr` attribute. Together they are responsible for the DOM added update event. The `id` is just for the identification of the component. The `data-lr` attribute adds a type to the component. You can create several templates for the same component. One for when data is loading, one for when data is loaded and you could add one when an error occurs. The `data-lr` value will be passed through as the `updateType` together with the id in a camelcased form. So in this example it will be `navigationLoaded`.

Next: [Adding url parameters via a parser](/guide/adding-url-parameters-via-a-parser)
