const Express = require('express');

const PORT = process.env.NODE_PORT || 3000;
const HOST = process.env.NODE_HOST || 'localhost';

const app = Express();

const renderFullPage = () =>
  `<!doctype html> 
  <html> 
    <head> 
      <title>Test react-wizard</title> 
      <link href="http://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/leaflet.css" rel="stylesheet" />
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

