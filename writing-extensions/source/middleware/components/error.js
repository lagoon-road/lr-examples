module.exports = (next, relay, request) => {
  relay.extensions.debug('Error occured for: ' + request.url);
  relay.extensions.renderer.render(`
    <h1>Error on the page</h1>
    <pre>${ relay.error }</pre>
  `, '.content');
  next();
}
