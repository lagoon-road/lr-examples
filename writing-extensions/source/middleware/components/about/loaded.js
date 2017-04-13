module.exports = (next, relay, request) => {
  relay.extensions.renderer.render(`
    <section id="about" data-lr="loaded">
      <h1>About the masked booby</h1>
      <p>${ relay.state.about }</p>
    </section>
  `, '.content');
  next();
}
