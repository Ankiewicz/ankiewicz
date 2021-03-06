'use strict';
const nodemailer = require('nodemailer');

function sendEmail (emailSendTo) {

      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      nodemailer.createTestAccount((err, account) => {

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
              service: "gmail",
              host: "smtp.gmail.com",
              secure: false, // true for 465, false for other ports
              auth: {
                  user: process.env.EMAIL_USER, // generated ethereal user
                  pass: process.env.EMAIL_PASSWORD  // generated ethereal password
              }
          });


          let mailOptions = {
              from: '"Jonathan Ankiewicz <Ankiewicz84@gmail.com>', // sender address
              to: emailSendTo.email, // list of receivers
              subject: 'Greetings Friends', // Subject line
              html: `<b> Welcome: ${emailSendTo.name}</b> has been completed<br/>
              ${emailSendTo.phone} <br/>
              ${emailSendTo.text} <br/>
              ` // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              return res.send('Email Sent')
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
      });
}

module.exports = sendEmail
