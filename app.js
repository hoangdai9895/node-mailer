var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailler = require('nodemailer');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));
app.listen(3000, (req, res) => {
    console.log('server is running on port 3000')
})


app.get('/', (req, res) => {
    res.render('index.jade', {title: "Welcome"})
})

app.get('/about', (req, res) => {
    res.render('about.jade', {title: "Welcome"})
})


app.get('/contact', (req, res) => {
    res.render('contact.jade', {title: "Welcome"})
})

app.post('/contact/send', (req, res) => {
    // console.log("bui hai yen")
    var transporter = nodemailler.createTransport({
        service: 'Gmail',
        auth: {
            user: 'matran248648@gmail.com',
            pass: '' // password mail
        }
    })

    var mailOptions = {
        from: 'Dai <hoangdai9895@gmail.com>',
        to:'hoangdai9895@gmail.com',
        subject:'website submittion',
        text: "You have a submitsion with the following details... Name: " + req.body.name + 'Email:' + req.body.email+ "Message:" + req.body.messenger,
        html: '<p>You have a submitsion with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>email: '+req.body.name+'</li><li>messenger: '+req.body.messenger+'</li></ul>' 
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message Sent' + info.response);
            res.redirect('/');
        }

    })
})