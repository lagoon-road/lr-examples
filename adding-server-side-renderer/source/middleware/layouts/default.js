module.exports = (next, relay) => {
  relay.extensions.debug('selecting template');
  relay.extensions.renderer.template(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Adding client side routing</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="Roy Niels">
      </head>
      <body>
        <nav></nav>
        <section class="content"></section>
      </body>
    </html>
  `);
  next();
}
