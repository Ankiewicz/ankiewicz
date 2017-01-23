
var router = require('express').Router()
var ejs = require('ejs')
var engine = require('ejs-mate')
var d3 = require('d3')



router.get('/', function(req, res) {
  res.render('./index')
})

router.get('/marketing', function(req, res) {
  res.render('./marketing')
})

router.get('/d3map', function(req, res) {
  res.render('./d3map')
})
router.get('/scoreboard', function(req, res) {
  res.render('./scoreboard')
})


module.exports = router
