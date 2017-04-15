module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section id="home" data-lr="loading">
      <h1>This is the homepage</h1>
      <p><button disabled>Load content</button>
      <article>Loading...</article>
    </section>
  `, '.content');
  next();
}
