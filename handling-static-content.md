# Handling static content
**Although it is possible to add middleware to handle your static files, like scripts, images and stylesheets. It is better to do this via a reverse proxy on a webserver like Nginx. Node is not the best choice when it comes to serving static content. This is way easier with a Nginx setup. It is trivial to gzip your files, add caching and catch redundant calls to your node server.
Furthermore it is pretty straight forward to add HTTPS with let's encrypt.**

**Read more about reverse proxies and Nginx in [this](https://code.lengstorf.com/deploy-nodejs-ssl-digitalocean/) outstanding post. Although it is for a Digital Ocean droplet, it shows you very clearly how to setup a reverse proxy that you can use without Digital Ocean.**

For testing purposes you might want to use some static middleware. The following code is mainly a copy from [here](https://developer.mozilla.org/en-US/docs/Node_server_without_framework) with some small adjustments to accommodate Lagoon road.

```
const url  = require('url');
const fs   = require('fs');
const path = require('path');

module.exports = (next, relay, request, response) => {
  const parsedUrl = url.parse(request.url);
  let pathname    = \`.\$\{ parsedUrl.pathname \}\`;
  const extension = path.parse(pathname).ext;

  const fileTypes = {
    '.ico'  : 'image/x-icon',
    '.html' : 'text/html',
    '.js'   : 'text/javascript',
    '.json' : 'application/json',
    '.css'  : 'text/css',
    '.png'  : 'image/png',
    '.jpg'  : 'image/jpeg',
    '.wav'  : 'audio/wav',
    '.mp3'  : 'audio/mpeg',
    '.svg'  : 'image/svg+xml',
    '.pdf'  : 'application/pdf',
    '.doc'  : 'application/msword'
  };

  // Not static
  if (!fileTypes[extension]) {
    relay.extensions.debug(\`\$\{ request.url \} is not static\`);
    next();
    return;
  }

  fs.exists(pathname, (exist) => {
    if(!exist) {
      relay.extensions.debug(\`\$\{ pathname \} does not exist on disk\`);
      response.end('404 - File not found');
      relay.exit();
    } else {
      relay.extensions.debug(\`\$\{ pathname \} does exist loading it\`);
      // read file from file system
      fs.readFile(pathname, (error, data) => {
        if (error){
          relay.extensions.debug(\`File \$\{ pathname \} not found on disk\`);
          response.end('404 - File not found');
        } else {
          relay.extensions.debug('sending back static file: ' + pathname);
          response.setHeader('Content-type', fileTypes[extension] || 'text/plain' );
          response.end(data);
        }
        relay.exit();
      });
    }
  });
}
```

We will not going to much into detail on how this middleware works, it is pretty self explanatory. The only thing to notice is that we use `relay.exit()` after we are done responding to a static request. Read the [stack and middleware](/guide/stack-and-middleware) section to find out why.

Next: [Turn your server side rendered page in to a single page app](/guide/make-a-single-page-app)
