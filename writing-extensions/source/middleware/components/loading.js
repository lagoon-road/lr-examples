module.exports = (next, relay) => {
  relay.extensions.renderer.render('<p>Loading...</p>', '.content');
  next();
}
