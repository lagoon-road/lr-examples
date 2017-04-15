module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <ul id="navigation" data-lr="loaded">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  `, 'nav');
  next();
}
