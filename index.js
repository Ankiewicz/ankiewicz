var express = require('express')
var app = express()
var morgan = require('morgan')
var ejs = require('ejs')
var engine = require('ejs-mate')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('./index')
})
app.get('/d3map', function(req, res) {
  res.render('./d3map')
})
app.get('/scoreboard', function(req, res) {
  res.render('./scoreboard')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
