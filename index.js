const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const datajson = fs.readFileSync('./data/data.json');
let data = JSON.parse(datajson);

app.set('views', path.join(__dirname, 'views')); // specify the views
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', {data}));
app.get('/add', (req, res) => res.render('add'));

app.post('/add', (req, res) => {
    data.push({string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean})
    fs.writeFileSync("./data/data.json", JSON.stringify(data));
    res.redirect('/');
})

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const editnew = {string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean};
    data.splice(id, 1, editnew);
    fs.writeFileSync("./data/data.json", JSON.stringify(data));
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    let index = req.params.id;
    data.splice(index, 1);
    fs.writeFileSync("./data/data.json", JSON.stringify(data));
    res.redirect('/');
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', { item: data[id] });
})

app.listen(3000, () => {
    console.log('web ini berjalan di port 3000!!!');
})