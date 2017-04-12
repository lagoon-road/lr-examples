# Adding url parameters via a parser

One of the most common tasks that a web server has to perform is take some dynamic parameter from the url and give that back the backend so it can handle it. In Lagoon road we use parsers for this.

##### adding-url-parameters-via-a-parser/source/bootstrap/road.js
```
const debug  = require('../extensions/debug');
const parser = require('lr-url-parser')();

module.exports = road => {
  return road
    .parser(parser)
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
      .run('/params/:id', 'components.home')
      .run('/params/:id/:something', 'components.home')
      .run('/contact', 'components.contact')
      .done('response');
}
```

As you can see there is already a package for dealing with dynamic url parts, `lr-url-parser`. You can add the parser by using the `parser` method.

```
.parser(parser)
```

You can now use dynamic url parts via the relay object, `relay.parameters`.

> The standard parser is for urls, but you are not limited to urls by any means. Want to analyze JSON or some other string values, [write are parser](/guide/writing-a-parser) and become as flexible as you need to be

Next: [Stack-and-middleware](/guide/stack-and-middleware)
