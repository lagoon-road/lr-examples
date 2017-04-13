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
    next();
    return;
  }

  fs.exists(pathname, (exist) => {
    if(!exist) {
      response.end('404 - File not found');
      relay.exit();
    } else {
      // read file from file system
      fs.readFile(pathname, (error, data) => {
        if (error){
          response.end('404 - File not found');
        } else {
          response.setHeader('Content-type', fileTypes[extension] || 'text/plain' );
          response.end(data);
        }
        relay.exit();
      });
    }
  });
}
