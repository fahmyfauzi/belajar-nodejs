const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();

const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// middleware thirdparty
app.use(expressLayouts);
app.use(morgan('dev'));

// application level middleware
app.use((req, res, next) => {
    console.log(`Time : ${Date.now()}`);
    next();
});

// middleware built-in
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile('./index.html', { root: __dirname });

    const mahasiswa = [{
            nama: 'Fahmy Fauzi',
            email: 'fahmyfauzii@gmail.com',
        },
        {
            nama: 'Inliya',
            email: 'lia@gmail.com',
        },
        {
            nama: 'alvianda',
            email: 'alvianda@gmail.com',
        },
    ];
    res.render('index', { mahasiswa, layout: 'layouts/main-layout', title: 'Halaman Index' });
});

app.get('/about', (req, res, next) => {
    // res.send('hello about');

    // console.log('halo ini halaman about');
    res.render('about', { layout: 'layouts/main-layout', title: 'Halaman Index' });
    // next();
});

app.get('/contact', (req, res) => {
    // res.send('hello contact');
    res.render('contact', { nama: 'fahmy fauzi', layout: 'layouts/main-layout', title: 'Halaman Contact' });
});

app.get('/product/:id/category/:idCat', (req, res) => {
    res.send(`Id produk : ${req.params.id} \n Id Category : ${req.params.idCat}`);
});

app.get('/product/:id', (req, res) => {
    res.send(`Id produk : ${req.params.id} \n Id Category : ${req.query.category}`);
});

app.use((req, res, next) => {
    res.status(404);
    res.send('<h1>404</h1>');
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});