const express = require('express');

const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const next = require('next');
const enrouten = require('express-enrouten');
const config = require('../config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const defaultRequestHandler = app.getRequestHandler();

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://${config.db.credential}@${config.db.host}/${config.db.name}`;
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  // Allows for cross origin domain request:
  server.use((req, res, nextStep) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    nextStep();
  });

  // MongoDB
  mongoose.Promise = Promise;
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line no-console

  // API routes
  server.use(enrouten({
    directory: path.join(__dirname, 'routes')
  }));

  // Next.js request handling
  const customRequestHandler = (page, req, res) => {
    // Both query and params will be available in getInitialProps({query})
    const mergedQuery = Object.assign({}, req.query, req.params);
    app.render(req, res, page, mergedQuery);
  };

  // Routes
  server.get('/', customRequestHandler.bind(undefined, '/'));
  server.get('*', defaultRequestHandler);

  server.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}/\nAPI running on http://localhost:${PORT}/api/`); // eslint-disable-line no-console
  });

});
