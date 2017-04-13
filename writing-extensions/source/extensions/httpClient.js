const superagent = require('superagent');

module.exports = domain => {
  return {
    get(path) {
      return superagent.get(domain + path).type('json');
    }
  }
}
