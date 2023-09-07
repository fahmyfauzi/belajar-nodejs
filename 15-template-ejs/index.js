const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();

const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

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

app.get('/about', (req, res) => {
    // res.send('hello about');
    res.render('about', { layout: 'layouts/main-layout', title: 'Halaman Index' });
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

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});