module.exports = (next, relay, request) => {
  relay.extensions.debug('Rendering component navigation: ' + request.url);
  relay.extensions.renderer.render(`
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  `, 'nav');
  next();
}
