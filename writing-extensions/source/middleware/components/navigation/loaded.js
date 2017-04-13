module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <ul id="navigation" data-lr="loaded">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/error">Error</a></li>
      <li><a href="#" class="customExtension">Custom extension</a></li>
    </ul>
  `, 'nav');
  next();
}
