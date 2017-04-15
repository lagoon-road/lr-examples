# Writing extensions

We already looked at a simple debug extension in the [adding server side renderer](adding-server-side-renderer) guide. It is time to look at two more examples.

```
const superagent = require('superagent');

module.exports = domain => {
  return {
    get(path) {
      return superagent.get(domain + path).type('json');
    }
  }
}
```

The first extension is for loading data. As you can see we create a function that expects a domain as argument. The reason for this is that if you are running the web server and API server on the same physical server you want to use a localhost address, whereas the client obviously needs a public domain.

The returned object just has one method, `get`. We pass in the path and `superagent` will return a promise. We will use this extension in the next guide and see how we go about working with async calls.

The next extension will be one that triggers an update event.

```
module.exports = update => {
  return {
    go() {
      update({ matchValue : 'updateValue', updateType : 'updateType'});
    }
  }
}
```

The extension looks very similar to the first one. It again has a single argument, this time it will be a function that has been passed in. We use the update function in the returned object within the `go` method.

Whenever you want to trigger the `update` function you pass in an option object with a `matchValue` and `updateType`. You can add optional parameters from the second argument on. They will be added to the middleware function like `request` and `response`.

To get an instance of the update function we have to look at the way we add the extension to the road.

```
road
	.extension('router', router, true);
``` 

The third parameter here is important, it will call the extension whenever it is added to the core. It will make the `update` function available to the extension.

> When you have update event triggering extensions and you need to set some parameters, you can just wrap it in another function like the first example. Just return a curried function, all rise to functional programming!

Next: [Working with data](/guide/working-with-data)