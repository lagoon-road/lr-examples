module.exports = (next, relay, request) => {
  relay.extensions.debug('Rendering component contact: ' + request.url);
  relay.extensions.renderer.render('<h1>This is the contact page</h1>', '.content');
  next();
}
