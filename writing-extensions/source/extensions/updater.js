module.exports = update => {
  return {
    go() {
      update({ matchValue : 'updateValue', updateType : 'updateType'});
    }
  }
}
