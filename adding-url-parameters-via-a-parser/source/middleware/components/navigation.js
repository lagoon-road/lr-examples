module.exports = (next, relay, request) => {
  relay.extensions.debug('Rendering component navigation: ' + request.url);
  relay.extensions.renderer.render(`
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/params/1">Parameters</a></li>
    </ul>
  `, 'nav');
  next();
}
