module.exports = (next, relay) => {
  relay.extensions.debug('rendering contact');
  relay.extensions.renderer.render('<h1>This is the contact page</h1>', '.content');
  next();
}
