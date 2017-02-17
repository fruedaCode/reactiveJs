var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/bower_components', express.static('bower_components'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/data', express.static('data'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})