# Make a single page app

Now that we have all the server side stuff in place it is time to spice things up a bit and show you where Lagoon road really shines, sharing code between environments. Let's first show you the code that we use to make it all work.

##### lr-examples/make-a-single-page-app/source/webserver.js
```
const protocol = require('http');
const server   = protocol.createServer();
const router   = require('lr-server-router')(server);
const renderer = require('lr-server-renderer')();
const road     = require('lr-core')('webserver')
  .extension('router', router, true)
  .extension('renderer', renderer)
  .middleware({
    'layouts.default' : require('../middleware/layouts/default'),
    response          : require('../middleware/response'),
    statics           : require('../middleware/statics'),
  });

require('./road')(road);

server.listen(8080, function() {
  console.log('server running on localhost:8080');
});
```

The webserver in basically the same as in the server side example, except that we removed the middleware that we want to share between enviroments. Only the middleware that is exclusive for the webserver is added in this file.

After we have setup the road, we pass it down to a new file, `require('./road')`.
```
require('./road')(road);
```

This is the file that we will use for all the shared code between environments.

##### lr-examples/make-a-single-page-app/source/client.js
```
const router   = require('lr-client-router');
const renderer = require('lr-client-renderer');
const road     = require('lr-core')('client')
  .extension('router', router, true)
  .extension('renderer', renderer, true)
  .middleware({
    'response' : (next, relay) => { relay.extensions.renderer.html() }
  });

require('./road')(road);
```

As you can see the client side code looks very similar to the web server code, the packages are different but are hooked in under the exact same name, this allows us to use the same middleware for both client and server. Specific client side middleware is hooked up in the `client.js` file.

##### lr-examples/make-a-single-page-app/source/road.js
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
    .where('webserver', 'client')
      .run('*', 'components.navigation')
      .run('/', 'components.home')
      .run('/contact', 'components.contact')
      .done('response');
}
```

Lastly the file where all the magic happends, `road.js`. As you might have expected is this file more or less the same as the other two files, middleware is hooked up, extensions added and listeners (`run` and `done`) listening. The road file is the place where we add all the stuff that needs to be shared between our environments. This is not limited to the client and web server. If you have an api server you can add the listeners here too. You have a single file were you can find all the paths that your app is using. It becomes very easy to figure out the flow of your app.

You can see that we use a new method
```
.where('webserver')
```

This method sets the context for all the following methods, so the core knows that the `run` method belongs to the webserver. Sharing methods between environments becomes a breeze, just add all the environments that need to share code and you are done.

```
.where('webserver', 'client')
```

Next: [Working with DOM events](/guide/working-with-dom-events)
