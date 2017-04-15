module.exports = (next, relay) => {
  relay.extensions.renderer.template(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Adding client side routing</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="Roy Niels">
        <link rel="stylesheet" href="public/stylesheets/styles.css">
        <script src="public/scripts/main.min.js"></script>
      </head>
      <body>
        <nav></nav>
        <section class="content"></section>
      </body>
    </html>
  `);
  next();
}
