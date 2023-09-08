const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const { loadContact, detailContact } = require('./contact');

const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// middleware thirdparty
app.use(expressLayouts);

// middleware built-in
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { layout: 'layouts/main-layout', title: 'Halaman Index' });
});

app.get('/about', (req, res, next) => {
    // res.send('hello about');

    // console.log('halo ini halaman about');
    res.render('about', { layout: 'layouts/main-layout', title: 'Halaman Index' });
    // next();
});

app.get('/contact', (req, res) => {
    // res.send('hello contact');
    const contacts = loadContact();
    res.render('contact', { nama: 'fahmy fauzi', layout: 'layouts/main-layout', title: 'Halaman Contact', contacts });
});

app.get('/contact/:nama', (req, res) => {
    const contact = detailContact(req.params.nama);
    res.render('detail', { layout: 'layouts/main-layout', title: 'nama', contact });
});

app.use((req, res, next) => {
    res.status(404);
    res.send('<h1>404</h1>');
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});