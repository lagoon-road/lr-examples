const router   = require('lr-client-router');
const renderer = require('lr-client-renderer');
const road     = require('lr-main')('client')
  .extension('router', router, true)
  .extension('renderer', renderer, true);

require('./road')(road);
