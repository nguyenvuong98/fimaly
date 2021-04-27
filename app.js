const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 5000;

app.set('views', 'view');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listen on port ${port} ...`);
});

app.get('/', (req, res) => {
    let data = require('./data/user.json');
    let title = "Vũ trụ TuMaFimaly - Server 3";
    let time = "00:00 27/04/2021";
    let lastUpdate = `Cập nhật lần cuối: ${time}`;
    let note = `Mỗi ngày mọi người làm nhiệm vụ để tăng điểm cống hiến (Kame, địa ngục, hành tinh ngục tù).\n
                Mỗi tuần quyên góp quỹ chung 50k Ballz để mở skill vũ trụ.\n
                Hàng ngày mọi người tập trung đầy đủ tham gia nhiệm vụ vũ trụ 21h
    `;
    res.render('index', {users: data, title: title, last: lastUpdate, note: note});
});