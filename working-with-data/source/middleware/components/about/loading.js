module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section id="about" data-lr="loading">Loading...</section>
  `, '.content');
  next();
}
