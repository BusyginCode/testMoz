var express = require('express'),
   path = require('path');
var fs = require('fs');
var app = express.createServer();

var port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', require('./app/routes/coreRoutes.js').index);

app.get('/products', function(req, res) {
  fs.readFile('./public/content1.json', 'utf8', function (err, data) {
  if (err) throw err;
  var jsonData = JSON.parse(data);
  	res.send(jsonData);
  });
});

app.listen(port);

console.log('Server listen port ' + port);
