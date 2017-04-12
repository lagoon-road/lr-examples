module.exports = (next, relay, request) => {
  relay.extensions.debug(`Incoming request: ${ request.url }`);
  next();
}
