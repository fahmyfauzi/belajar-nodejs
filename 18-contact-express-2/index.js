const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const { loadContact, detailContact, addContact, cekDuplikat } = require('./utils/contact');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// middleware thirdparty
app.use(expressLayouts);

// middleware built-in
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

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
    res.render('contact', {
        nama: 'fahmy fauzi',
        layout: 'layouts/main-layout',
        title: 'Halaman Contact',
        contacts,
        msg: req.flash('msg'),
    });
});

app.get('/contact/add', (req, res) => {
    res.render('add-contact', { layout: 'layouts/main-layout', title: 'Halaman Tambah Contact' });
});

app.get('/contact/:nama', (req, res) => {
    const contact = detailContact(req.params.nama);
    res.render('detail', { layout: 'layouts/main-layout', title: 'nama', contact });
});

app.post(
    '/contact', [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value);
            if (duplikat) {
                throw new Error('Nama sudah terdaftar');
            }
            return true;
        }),
        check('email', ['Email tidak valid!']).isEmail(),
        check('noHp', 'No  Hp tidak valid!').isMobilePhone('id-ID'),
    ],
    (req, res) => {
        // console.log(req.body);
        // res.send('Data berhasil dikirim');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({
            //     errors: errors.array(),
            // });
            res.render('add-contact', {
                layout: 'layouts/main-layout',
                title: 'Form Tambah Contact',
                errors: errors.array(),
            });
        } else {
            addContact(req.body);
            req.flash('msg', 'Data berhasil ditambahkan!');
            res.redirect('/contact');
        }
    }
);

app.use((req, res, next) => {
    res.status(404);
    res.send('<h1>404</h1>');
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});