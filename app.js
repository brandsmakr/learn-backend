const express = require('express');
const path = require('path');
const app = express();
const port = 8242;

const bodyParser = require('body-parser');

// mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dance_academy', 
{useNewUrlParser:true}, {useUnifiedTopology: true});

// definig mongoose schema
const danceContact = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    desc: String
});
var contact = mongoose.model('contact', danceContact);

// app.use(express.static('static', options));

// express specific stuff
app.use('/static', express.static('static')); // for saving static file
app.use(express.urlencoded());

// PUG specific stuff
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // set the views directory

//End points
app.get('/', (req, res)=>{
    const con = 'This is the best content on the internet so far use it wisely';
    const params = {
    };
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const con = 'This is the best content on the internet so far use it wisely';
    const params = {
    };
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    var my_data = new contact(req.body);
    my_data.save().then(()=>{
        res.send("This items has been saved to the database");
    }).catch(()=>{
        res.status(400).send("This items was not saved to the database");
    })
    // res.status(200).render('contact.pug');
});

app.get('/index', (req, res)=>{
    const con = 'This is the best content on the internet so far use it wisely';
    const params = {
    };
    res.status(200).render('index.pug', params);
});

app.listen(port, ()=>{
    console.log(`your server is running on port ${port}`);
});