const express = require('express');
const app = express();
const fs = require('fs');
let bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
var _ = require('lodash');

app.set('views', 'view');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

var data = require('./public/data/user.json');
const moment = require('moment');
var {title} = require('./public/data/title.json') || "Vũ trụ TuMaFimaly - Server 3";
var time = moment().format('MM/DD/YYYY, HH:mm:ss');

var {note} = require('./public/data/note.json') || '';

app.listen(port, () => {
    console.log(`Server listen on port ${port} ...`);
});

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/edit', (req, res) => {
    res.render('edit');
});


