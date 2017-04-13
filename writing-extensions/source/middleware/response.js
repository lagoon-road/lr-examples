module.exports = (next, relay, request, response) => {
  response.end(relay.extensions.renderer.html());
  next();
}
