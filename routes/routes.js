
var router = require('express').Router()
var ejs = require('ejs')
var engine = require('ejs-mate')
var d3 = require('d3')
// var helper = require('sendgrid').mail;
// var mailer = require('sendgrid-mailer').config(process.env.SENDGRID_API_KEY);
var mailer = require('sendgrid-mailer').config('process.env.SENDGRID_API_KEY')






router.get('/', function(req, res, next) {
  res.render('./index')
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

router.post('/sendEmail', function(req, res, next){

  console.log(req.body);
    // res.json(req.body);
  // Create email data
  const email = {
    to: 'ankiewicz84@gmail.com,' + req.body.email,
    from: 'ankiewicz84@gmail.com',
    subject: 'Hello world',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>' + req.body.text,
  };

  // Send away
  mailer.send(email); //Returns promise
  res.send({success: 'success'})
})



module.exports = router
