module.exports = async function(next, relay, request) {
  try {
    relay.extensions.debug('Rendering component contact: ' + request.url);
    const path = 'pages/1.0.json?id=1048601&details=true';
    const data = await relay.extensions.httpClient.get(path);
    relay.extensions.renderer.render(`
      <h1>About the masked booby</h1>
      <p>${ JSON.parse(data.text).dataObjects.shift().description }</p>
    `, '.content');
    next();
  } catch (error) {
    console.log(error);
    next();
  }
}
