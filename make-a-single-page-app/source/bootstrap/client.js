document.addEventListener("DOMContentLoaded", function(event) {
  const router   = require('lr-client-router');
  const renderer = require('lr-client-renderer');
  const road     = require('lr-core')('client');
  road
    .extension('router', router, true)
    .extension('renderer', renderer, true)
    .middleware({
      'response' : (next, relay) => { relay.extensions.renderer.html() }
    });

  require('./road')(road);
});
