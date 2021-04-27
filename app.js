const express = require('express');
const app = express();
const fs = require('fs');
let bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

app.set('views', 'view');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

var data = require('./data/user.json');
const moment = require('moment');
var {title} = require('./data/title.json') || "Vũ trụ TuMaFimaly - Server 3";
var time = "00:00 27/04/2021";

var {note} = require('./data/note.json') || '';

app.listen(port, () => {
    console.log(`Server listen on port ${port} ...`);
});

app.get('/', (req, res) => {
    let lastUpdate = `Cập nhật lần cuối: ${time}`;
    res.render('index', {users: data, title: title, last: lastUpdate, note: note});
});
app.get('/edit', (req, res) => {
    res.render('edit', {users: data, title: title, note: note});
});

app.post('/update', (req, res) => {
    let data1 =  req.body.users;
    let title1 = req.body.title;
    let note1 = req.body.note;
    //res.send({data, title, note});
    data = JSON.parse(data1);
    title = title1;
    note = note1;
    time = moment().format('MM/DD/YYYY, HH:mm:ss');;
    fs.writeFileSync('./data/user.json', data1);
    fs.writeFileSync('./data/title.json', JSON.stringify({title:title1}));
    fs.writeFileSync('./data/note.json', JSON.stringify({node: note1}));
    res.send({status: true});
});

