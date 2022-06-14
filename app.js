const express = require('express');
const path = require('path');
const app = express();
const port = 8242;

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
    res.status(200).render('index.pug', params);
});

app.listen(port, ()=>{
    console.log(`your server is running on port ${port}`);
});