module.exports = async function(next, relay) {
  const path  = 'pages/1.0.json?id=1048601&details=true';
  const data  = await relay.extensions.httpClient.get(path);
  const home  = JSON.parse(data.text).dataObjects.shift().description;
  const state = Object.assign({}, relay.state ? relay.state : {}, { home });
  next({ state });
}
