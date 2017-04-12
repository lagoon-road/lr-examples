module.exports = (next, relay) => {
  console.log(`There are ${ document.querySelector('nav ul').children.length } menu items`);
  next();
}
