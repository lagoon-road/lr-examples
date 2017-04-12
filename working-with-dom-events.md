# Working with DOM events

In this guide we will do a simple `console.log` from our event middleware that will show you that the DOM is ready to be accessed.

##### working-with-dom-events/source/events/navigation.js
```
module.exports = (next, relay) => {
  console.log(\`There are \$\{ document.querySelector(\'nav\').children.length \} menu items\`);
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

The most changes have happend in the `client.js` file. Firstly we wrapped the whole code in a `DOMContentLoaded` event handler. The reason for this is that we want to initialize the events middleware when we first open the page.

You can see that we also added the `events.navigation` middleware to this file, DOM events happen only on the client so this will make sense.

The third and last change is the following piece of code
```
require('./road')(road)
  .where('client')
    .update({ matchValue : 'nav', updateType : 'domReady' })
```
We have changed the `road.js` file so that it gives us back the `road` object. Once the shared methods have been applied to the road it is time to fire a manual `update` event. The `update` event takes a single object as argument with two parameters. The `matchValue` and `updateType`. In this case we want to update our road for all the `nav` html selectors that have an `updateType` of `domReady`. You can see here that Lagoon road is in no way limited to handle the http protocol. We are doing updates based on html selectors and give it a custom `updateType`!

> It is good practice to always wrap the `client.js` file in a `DOMContentLoaded` event. This way you can always update the road when you need to.

##### working-with-dom-events/source/bootstrap/road.js
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

The last file that has changed is the `road.js` file. Two changes have been made to this file. We are returning the road object, so the client can initiate the update on `DOMContentLoaded`. The other change is the following code
```
.where('client')
  .run('nav', 'events.navigation', 'domReady')
```

We have added a listener for the `nav` html selector with `updateType` `domReady`. Every time the navigation is re-rendered it will trigger the appropriate middleware.

> The `lr-client-renderer` is the package that sends out events whenever a component is ready and loaded in the dom.
