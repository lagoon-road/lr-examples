module.exports = (next, relay) => {
  relay.extensions.debug('rendering navigation');
  relay.extensions.renderer.render(`
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  `, 'nav');
  next();
}
