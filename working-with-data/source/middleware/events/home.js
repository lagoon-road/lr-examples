module.exports = (next, relay) => {
  document.querySelector('button').addEventListener('click', event => {
    event.preventDefault();
    relay.update({ matchValue : window.location.pathname, updateType : 'data' });
  });
  next();
}
