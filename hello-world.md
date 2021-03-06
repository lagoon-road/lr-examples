# Hello world
The most simple and of course mandatory example is the hello-world example. In our case it will be a server only response which you can check in your browser. Open a browser tab and navigate to `http://localhost:8080`. This should show you a nice header with _Hello World_.

> Check the [setup and running the examples](/guide/setup) to see how to start the webserver.

#### The code
Let's have a look at how the response has been generated.

##### hello-world/source/bootstrap/webserver.js
```
const protocol = require('http');
const server   = protocol.createServer();
const router   = require('lr-server-router')(server);
require('lr-main')('webserver')
  .extension('router', router, true)
  .middleware({
    response : (next, relay, request, response) => {
      response.end('<h1>Hello world</h1>');
    }
  })
  .done('response');

server.listen(8080, function() {
  console.log('server running on localhost:8080');
});
```

As you can see, it is a pretty straight forward process. First we add some standard packages and create the node server.

The first thing that needs some explanation is the router package.
```
const router   = require('lr-server-router')(server);
```
The router package is a simple wrapper around the server request event and takes care of routing the request throught the core. As you can see it needs one argument, namely the server that you want to use.

> Lagoon road doesn't limit itself to the HTTP protocol. Using websockets, or maybe both together, [extensions](/guide/writing-extensions) are the way to go.

The next step is initializing the core and create a road object.

```
require('lr-main')('webserver')
```

We intialize the core here with a single argument. The argument is the identifier for our environment. Each time you initialize the road you want to tell it the context of where we want to attach the middleware and extensions. In this case we want to run it as a web server so we use that as the identifier.

> The executing environment, in this case `webserver` will make more sense when we have more environments and start sharing code between them. We will look at that in the next examples.

After we have initialized the road we want to attach our router as an extension.

```
.extension('router', router, true)
```

It is very simple to add an extension. Just give it an id, the first argument, add the package, the second argument, and you are done. In our case we have a third argument, a boolean. This tells the core to execute the middleware on initialization. This is typically for packages that can trigger updates, like a router, that receives request events.

> To learn more about extensions and execution on initialization read about writing [extensions](/guide/writing-extensions)

Now that we added the router as an extension, we can actually receive request events. In order to act upon these events we need to add some middleware.

```
.middleware({
  response : (next, relay, request, response) => {
    response.end('<h1>Hello world</h1>');
    next();
  }
})
```
As you can see the middleware method expects an object as argument. It is a flat, non nested object where you can assign all the middleware that you need. In our case that is a single one. The middleware might have an odd argument signature for people who are familiar with middleware. There is a good reason for this change which you can read about in the [faq](/faq) section. The middlware is a simple response that sends back the html that we want to show on the client.

> Always call the `next` method, even in the last middleware that you add. Read why in the [update and middleware stack](/guide/update-and-middleware-stack)

To act upon an event that might be triggered by the router, we need to add some listeners to the road. There are a couple of ways to do this. There is `run`, `noMatch`, `error` and `done`. The first three we will see in the following examples in this guide. For now we use the `done` hook. 

```
.done('response')
```

The `done` hook is the last middleware that gets added to the stack that needs to be executed. It is the perfect place to respond to requests and as we will see later, render html. As you can see, the method takes a single argument, the middleware id. The middleware id is the key in the object that we specified in the middelware method. Now we have added a listener to the road, so whenever an update happends, regardless of the path it will go through the `done` method and in our case respond with a nice 'hello world'.

Now that we have got our feet wet in the warm calm waters of Lagoon road it is time to add a server side renderer to send some proper html back.

Next: [Adding the server side renderer](/guide/adding-server-side-renderer)
