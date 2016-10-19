var express = require('express');
var path = require('path');
var app = express();
var rootpath = path.normalize(__dirname + '/client');

app.use("/static", express.static(rootpath));

app.listen(3001, function(err) {
  if (err) console.error(err);
  console.log('React app running on port 3001...');
});
