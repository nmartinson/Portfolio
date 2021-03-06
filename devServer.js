
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './app/config/routes';
import webpack from 'webpack'
import Helmet from 'react-helmet';
import NotFoundPage from './app/components/NotFoundPage';

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config  from './webpack.dev.config'


// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);

var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
}))

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}))

// define the folder that will be used for static assets
//app.use('/static',Express.static('public'));


// app.get('*.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   console.log('GZIP')
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

// universal routing and rendering
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    // in case of error display the error message
    if (err) {
      return res.status(500).send(err.message);
    }

    // in case of redirect propagate the redirect to the browser
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    const initialState = { true };

    // generate the React markup for the current route
    let markup;
    if (renderProps) {
      // if the current route matched we have renderProp
      markup = renderToString(<RouterContext {...renderProps}/>);
    } else {
      // otherwise we can render a 404 page
      markup = renderToString(<NotFoundPage/>);
      res.status(404);
    }
        markup = renderToString(<RouterContext {...renderProps}/>);
        let head = Helmet.rewind();

        /* render document with Helmet-rendered `<head>` info
           and React-rendered body. then, initialize the client
           side via `client.js`.
           Note: Helmet will update your page's `<head`> on the client
                 side, but you must construct `<head>` manually
                 on the server. */
        let html = `
            <!doctype html>
				<html lang="en" style="height:100%">
                <head>
					<meta charset="utf-8" />
					<meta charset="UTF-8">
					<meta name="viewport" content="initial-scale=1">
					<title>Boundless-Journey</title>
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
          <link rel="manifest" href="/manifest.json">
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">
          <meta name="theme-color" content="#ffffff">
          <link rel="stylesheet" type="text/css" href="sortable.css">
					<link rel="stylesheet" type="text/css" href="styles.css">
					<link rel="stylesheet" type="text/css" href="app/css/Global.css">
					<link rel="stylesheet" type="text/css" href="Global.css">
          <link rel="stylesheet" type="text/css" href="/styles.css">

					<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
					${head.title.toString()}
					${head.meta}
                </head>
				<body style="height:100%">
				  <div id="app" style="height:100%">${markup}</div>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        `;
        res.send(html)  
  });
});

// start the server
const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);

});