
var router = require('express').Router()
var ejs = require('ejs')
var engine = require('ejs-mate')
var d3 = require('d3')
// var helper = require('sendgrid').mail;
// var mailer = require('sendgrid-mailer').config(process.env.SENDGRID_API_KEY);
var mailer = require('sendgrid-mailer').config('process.env.SENDGRID_API_KEY')
var sendEmail = require('./emailService');





router.get('/', function(req, res, next) {
  res.render('./index')
})

router.get('/font-ankie', function(req, res, next) {
  res.render('./public/font-website/index.html')
})

router.get('/marketing', function(req, res, next) {
  res.render('./marketing')
})

router.get('/d3map', function(req, res, next) {
  res.render('./d3map')
})
router.get('/scoreboard', function(req, res, next) {
  res.render('./scoreboard')
})

router.post('/sendEmail', (req, res, next) => {
  sendEmail({
    email: 'ankiewicz84@gmail.com,' + req.body.email,
    name: req.body.name,
    message: req.body.text,
    phone: req.body.phone
  })
  res.send('Currently Email system is down, I will have this back in ASAP.')
})

module.exports = router
