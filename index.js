var express = require('express')
var app = express()
var morgan = require('morgan')
var bodyParser = require("body-parser");
var ejs = require('ejs')
var engine = require('ejs-mate')
var d3 = require('d3')

// app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));
app.use(bodyParser.json());

app.engine('ejs', engine);
app.set('view engine', 'ejs');

var routes = require('./routes/routes');
app.use(routes);


// app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'))
// })
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
