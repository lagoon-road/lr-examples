module.exports = (next, relay, request) => {
  relay.extensions.debug('Rendering component navigation: ' + request.url);
  relay.extensions.renderer.render(`
    <ul id="navigation" data-lr="loaded">
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  `, 'nav');
  next();
}
