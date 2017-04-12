const router   = require('lr-client-router');
const renderer = require('lr-client-renderer');
const core     = require('lr-core');
const road     = core('client')
  .extension('router', router, true)
  .extension('renderer', renderer, true)
  .middleware({
    'response' : (next, relay) => { relay.extensions.renderer.html() }
  });

require('./road')(road);
