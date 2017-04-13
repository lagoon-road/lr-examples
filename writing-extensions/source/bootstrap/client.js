require("babel-polyfill");
const router     = require('lr-client-router');
const renderer   = require('lr-client-renderer');
const httpClient = require('../extensions/httpClient')('http://eol.org/api/');
const core       = require('lr-core');
const road       = core('client')
  .extension('router', router, true)
  .extension('renderer', renderer, true)
  .extension('httpClient', httpClient)
  .middleware({
    'events.navigation' : require('../middleware/events/navigation'),
    'events.home'       : require('../middleware/events/home')
  });

require('./road')(road);
