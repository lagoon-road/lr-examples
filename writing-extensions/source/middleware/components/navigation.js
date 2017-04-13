module.exports = (next, relay, request) => {
  relay.extensions.debug('Rendering component navigation: ' + request.url);
  relay.extensions.renderer.render(`
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/error">Error</a></li>
    </ul>
  `, 'nav');
  next();
}
