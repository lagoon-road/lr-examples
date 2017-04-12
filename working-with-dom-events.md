# Working with DOM events

In this guide we will do a simple `console.log` from our event middleware that will show you that the DOM is ready to be accessed.

##### working-with-dom-events/source/events/navigation.js
```
module.exports = (next, relay) => {
  console.log(\`There are \$\{ document.querySelector('nav').children.length \} menu items`);
  next();
}
```

Just a regular middleware function that should give is the number of menu items.

##### working-with-dom-events/source/bootstrap/client.js
```
document.addEventListener("DOMContentLoaded", function(event) {
  const router   = require('lr-client-router');
  const renderer = require('lr-client-renderer');
  const core     = require('lr-core');
  const road     = core('client')
    .extension('router', router, true)
    .extension('renderer', renderer, true)
    .middleware({
      'response'          : (next, relay) => { relay.extensions.renderer.html() },
      'events.navigation' : require('../events/navigation')
    });

  require('./road')(road)
    .where('client')
      .update({ matchValue : 'nav', updateType : 'domReady' })
});
```

We hook up the middleware in the `client.js` file because it is obviously only used on the client.

#####
```
const debug = require('../extensions/debug');

module.exports = road => {
  return road
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
      .run('/contact', 'components.contact')
      .done('response');
}
```

Finally we will add the middleware to the `client` environment and listen to the `domLoaded` `updateType`. As you can see we are not limited to the typical HTTP methods when it comes to the `updateType`.

> The `lr-client-renderer` is the package that sends out events whenever a component is ready and loaded in the dom.
