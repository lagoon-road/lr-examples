module.exports = (next, relay, request, response) => {
  relay.extensions.debug('sending html response');
  response.end(relay.extensions.renderer.html());
}
