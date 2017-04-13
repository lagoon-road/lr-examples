module.exports = (next, relay) => {
  console.log('custom extension triggered');
  next();
}
