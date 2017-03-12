import path from 'path';
import { Server } from 'http';
import Express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import routes from './app/config/routes';
// import template from './app/template';
// import Helmet from 'react-helmet';
// import NotFoundPage from './app/components/NotFoundPage';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);


// define the folder that will be used for static assets
app.use('/static',Express.static('public'));



// universal routing and rendering
app.get('*', require('./app/components/serverRender'));

// start the server
const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);

});