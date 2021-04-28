const express = require('express');
const app = express();
const fs = require('fs');
let bodyParser = require('body-parser')
const port = process.env.PORT || 5000;
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
    let lastUpdate = `Cập nhật lần cuối: ${time}`;
    data.forEach(item => {
        item.stt = parseInt(item.stt);
        item.position = parseInt(item.position);
        item.scorce = parseInt(item.scorce);
        item.weekScore = parseInt(item.weekScore);
        item.ballz = parseInt(item.ballz);
    })
    let users = _.orderBy(data, ['stt'], ['asc']);
    console.log('user ', users);
    res.render('index', {users: users, title: title, last: lastUpdate, note: note});
});
app.get('/edit', (req, res) => {
    data.forEach(item => {
        item.stt = parseInt(item.stt);
        item.position = parseInt(item.position);
        item.scorce = parseInt(item.scorce);
        item.weekScore = parseInt(item.weekScore);
        item.ballz = parseInt(item.ballz);
    });
    let users = _.orderBy(data, ['stt'], ['asc']);
    res.render('edit', {users: users, title: title, note: note});
});

app.post('/update', (req, res) => {
    let data1 =  req.body.users;
    let title1 = req.body.title;
    let note1 = req.body.note;
    //res.send({data, title, note});
    data = JSON.parse(data1);
    title = title1;
    note = note1;
    let users = _.orderBy(data, ['stt'], ['asc']);
    data = users;
    time = moment().format('MM/DD/YYYY, HH:mm:ss');
    fs.writeFileSync('./public/data/user.json', JSON.stringify(users));
    fs.writeFileSync('.//public/data/title.json', JSON.stringify({title:title1}));
    fs.writeFileSync('./public/data/note.json', JSON.stringify({node: note1}));
    res.send({status: true});
});

