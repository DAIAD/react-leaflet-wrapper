const Express = require('express');

const PORT = process.env.NODE_PORT || 3000;
const HOST = process.env.NODE_HOST || 'localhost';

const app = Express();

const renderFullPage = () =>
  `<!doctype html> 
  <html> 
    <head> 
      <title>Test react-leaflet-wrapper</title> 
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0/dist/leaflet.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css"/>
      <link href="dist/style.css" rel="stylesheet" />
      <link rel="icon" href="data:;base64,iVBORw0KGgo="> 
    </head> 
    <body> 
      <div id="app"></div> 
      <script src="dist/bundle.js"></script> 
    </body> 
  </html> 
  `;

app.use('/dist', Express.static('example/dist'));

app.get('/', (req, res) => {
  res.status(200).send(renderFullPage());
});

app.listen(PORT, HOST, function() {
  console.info(`Listening to ${HOST}:${PORT}`);
})

