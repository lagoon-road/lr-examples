module.exports = (next, relay, request) => {
  relay.extensions.debug('Rendering component home: ' + request.url);
  relay.extensions.renderer.render('<h1>This is the homepage</h1>', '.content');
  next();
}
