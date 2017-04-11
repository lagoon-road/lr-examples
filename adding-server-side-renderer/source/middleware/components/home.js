module.exports = (next, relay) => {
  relay.extensions.debug('rendering home');
  relay.extensions.renderer.render('<h1>This is the homepage</h1>', '.content');
  next();
}
