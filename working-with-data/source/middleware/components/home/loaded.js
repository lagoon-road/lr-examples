module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section id="home" data-lr="loaded">
      <h1>This is the homepage</h1>
      <p><button>Load content</button>
      <article>${ relay.state && relay.state.home ? relay.state.home : '' }</article>
    </section>
  `, '.content');
  next();
}
