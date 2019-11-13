var express = require('express');
var path = require('path');
var nodeMailer = require('nodemailer');
var bodyparser = require('body-parser');
//var xoauth2 = require('xoauth2');
// var config = require('./config/mailtrapConfig');
var app = express();

app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.get('/', function (req, res) {
    res.render('index');
  });
app.get('/send-email',(req,res)=>{
    res.render('send-mail');
});
app.post('/send-email',(req,res)=>{
    var transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
          auth: {
              user: 'd0fdf710009889',
              pass: '805cf3179578c4'
          },
        tls:{
            rejectUnauthorized:false
        }
    });
    let mailOptions = {
        from: 'shivanmthejas@gmail.com', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body // plain text body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error occured");
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            console.log('email sent')
            res.render('index');
        });
})  
app.listen(8000,()=>{
    console.log("listing to posrt 8000");
})