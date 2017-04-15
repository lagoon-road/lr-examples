module.exports = (next, relay) => {
  document.querySelector('.customExtension').addEventListener('click', event => {
    event.preventDefault();
    relay.extensions.updater.go();
  });
  console.log(`There are ${ document.querySelector('nav ul').children.length } menu items`);
  next();
}
