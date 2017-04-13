module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section id="about" data-lr="error">
      <h1>An error occured</h1>
      <pre>${ relay.error }</pre>
    </section>
  `, '.content');
  next();
}
