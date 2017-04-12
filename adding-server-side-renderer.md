# Adding server side renderer

After creating a simple hello world example it is time to add some proper rendering to the server side. The following code uses the `lr-server-renderer` the let us easily add a template and components.

##### adding-server-side-renderer/source/bootstrap/webserver.js
```
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
    debug                   : require('../middleware/debug'),
    response                : require('../middleware/response'),
    'components.home'       : require('../middleware/components/home'),
    'components.navigation' : require('../middleware/components/navigation'),
    'components.contact'    : require('../middleware/components/contact'),
    'layouts.default'       : require('../middleware/layouts/default'),
  })
  .run('*', 'debug')
  .run('*', 'layouts.default')
  .run('*', 'components.navigation')
  .run('/', 'components.home')
  .run('/contact', 'components.contact')
  .done('response');

server.listen(8080, function() {
  console.log('server running on localhost:8080');
});
```

As you can see we added two more extensions. The `renderer` extension and the `debug` extension. The `renderer` extension is a package by itself so we will not go into specifics over how it is implemented, but we will look at the debug extension so you have a feel how you can write a simple extension.

> You can find the source code for the renderer extension on [github](https://github.com/lagoon-road/lr-server-renderer/blob/master/index.js).

##### adding-server-side-renderer/source/extensions/debug.js
```
module.exports = message => {
  console.log('DEBUG: ' + message);
}
```

As you can see the `debug` extension is nothing more then a function. In our case just a function around the `console.log`. This might not be the most useful extension but it shows how you can use extensions to centralize your code. If we were to use an actual logger/debugger like `debug`, `morgan` or `winston` we can create a very thin function wrapper and use the extension in all our middleware. When you change your debugger later, you only change the extension and have all the middleware automatically use it. Pretty DRY.

So how would you use the extension in your middleware? Well for that we look at the `debug` middleware.
```
module.exports = (next, relay, request) => {
  relay.extensions.debug(\`Incoming request [\$\{ request.method \}]: \$\{ request.url \}\`);
  next();
}
```
You can see how we can access the extension by using the `relay` object.

### Relay object
The relay object is something that you not see in standard middleware, but the concept is pretty simple. The `relay` object is passed from middleware to middleware, hence the name relay. Every extension, or variable that you add becomes available in every middleware function that comes after it. All `extensions` are available at `relay.extensions.extensionName`.

When you want to set a variable in your middleware that needs to be available to all the following middleware you simply pass and object to the `next` function like so:
```
next({ someVariable : true });
```
The object will automatically be merged with existing `relay` variables which makes it easy to pass on data between middleware.

> If you want to use the relay object as a state manager it might be handy to add all the state to a state object.
> ```
> module.exports = (next, relay) => {
>   const state = Object.assign({}, relay.state, { someNewProperty : true});
>   next({ state });
> }
> ```
> This way it is easy to send everything from the server to the client in the template, which saves you to make redundant calls from the client.

### Listening for changes
Now that we added some middleware for our debugger it is time to let it listen for http requests.

```
.run('*', 'debug')
```
As you can see we use a new method, namely `run`. The `run` method can be thought of as the `get` method in traditional middleware. Whenever a `GET` request comes in it will be triggered. The reason for not calling it get is that we are not limited to only use the http protocol. So it would make little sense to call it get. Furthermore you can see that you can use the asterix (\*) symbol to listen to all `GET` requests.

> If you need to listen to another method, or in Lagoon road called `updateType`. You can specify a third parameter.
> ```
> .run(*, 'debug', 'post')
> ```

### Adding a template
Great so we have added a simple debug function, time to get our templating up and running. First we want to define a template.
```
module.exports = (next, relay) => {
  relay.extensions.debug('selecting template');
  relay.extensions.renderer.template(\`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Adding client side routing</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="Roy Niels">
      </head>
      <body>
        <nav></nav>
        <section class="content"></section>
      </body>
    </html>
  \`);
  next();
}
```
We are using the `renderer` extension to set the template. The `template` method needs a single argument, which is a string with raw html. It has a `<nav>` and `<section class="content"></section>` tag. This is were our components will be placed.

Each request needs a template so we add it like we did with the `debug` middleware, with an asterix.
```
.run('*', 'layouts.default')
```

You can see that you can easily use multiple templates for different routes if you wish to.

> We are passing in raw html to the renderer. Because of this it becomes very easy to use any templating engine, as long as you get a string back, you can use whatever you want. This is one of the ways that Lagoon road is unopinionated.

### Adding a component
The template is in place, time to add the components. We will look at the middleware for the contact page, all the other components use the same technique.

```
module.exports = (next, relay) => {
  relay.extensions.debug('rendering contact');
  relay.extensions.renderer.render('<h1>This is the contact page</h1>', '.content');
  next();
}
```

We use the same renderer extension as we used for the template, but a different method, `render`. This  method takes two parameters. The first one, again a raw html string, the second one, a html selector. Just like you do when working with the regular browser DOM.

Hooking it up to the road is slightly different, we want to only render the component on the `/contact` page, so we will set up the `matchValue` accordingly
```
.run('/contact', 'component.contact')
```

> `matchValue` is the first argument in the `run` method.

### Rendering the output
We have slightly changed the response middleware to accommodate the `renderer` extension.
```
module.exports = (next, relay, request, response) => {
  relay.extensions.debug('sending html response');
  response.end(relay.extensions.renderer.html());
}
```
We call the `html` method to get a fully renderer html page as a string and send that back to the client.

Before we go and add the client side code to create a single page app, we want to take a look at how we can handle static content, like our javascript files, images and stylesheets.

Next: [Handling static content](/guide/handling-static-content)
