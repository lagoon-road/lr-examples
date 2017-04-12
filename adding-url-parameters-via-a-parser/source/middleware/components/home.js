module.exports = (next, relay, request) => {
  relay.extensions.debug('Rendering component home: ' + request.url);
  relay.extensions.debug('URL parameters: ' + JSON.stringify(relay.parameters));
  relay.extensions.renderer.render('<h1>This is the homepage</h1>', '.content');
  next();
}
