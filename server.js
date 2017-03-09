var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

import router from './app/config/index';



app.use(express.static(publicPath));

app.use('/bin', express.static('./bin'));
app.use('/stylesheets', express.static('./public/stylesheets'));


app.use('/', router);
app.use('/view/*', router);

app.listen(port, function () {
  console.log('Server running on port ' + port);
});