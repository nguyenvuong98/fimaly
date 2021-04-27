const express = require('express');
const app = express();
const fs = require('fs');
let bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

app.set('views', 'view');
app.set('view engine', 'ejs');
app.use(express.static('public'));
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data = require('./data/user.json');
var {title} = require('./data/title.json') || "Vũ trụ TuMaFimaly - Server 3";
var time = "00:00 27/04/2021";
var lastUpdate = `Cập nhật lần cuối: ${time}`;
var {note} = require('./data/note.json') || '';

app.listen(port, () => {
    console.log(`Server listen on port ${port} ...`);
});

app.get('/', (req, res) => {
    
    res.render('index', {users: data, title: title, last: lastUpdate, note: note});
});
app.get('/edit', (req, res) => {
    
    res.render('edit', {users: data, title: title, last: lastUpdate, note: note});
});

app.post('/update', jsonParser, (req, res) => {
    data =  req.body.users;
    title = req.body.title;
    note = req.body.note;
    fs.writeFileSync('./data/user.json', JSON.stringify(data));
    fs.writeFileSync('./data/title.json', JSON.stringify({title}));
    fs.writeFileSync('./data/note.json', JSON.stringify({note}));
    res.redirect('/');
});

