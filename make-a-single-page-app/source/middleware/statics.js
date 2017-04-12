const url  = require('url');
const fs   = require('fs');
const path = require('path');

module.exports = (next, relay, request, response) => {
  const parsedUrl = url.parse(request.url);
  let pathname    = `.${parsedUrl.pathname}`;
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
    relay.extensions.debug(`${ request.url } is not static`);
    next();
    return;
  }

  fs.exists(pathname, (exist) => {
    if(!exist) {
      relay.extensions.debug(`${ pathname } does not exist on disk`);
      response.end('404 - File not found');
      relay.exit();
    } else {
      relay.extensions.debug(`${ pathname } does exist loading it`);
      // read file from file system
      fs.readFile(pathname, (error, data) => {
        if (error){
          relay.extensions.debug(`File ${ pathname } not found on disk`);
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
