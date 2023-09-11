const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();

// setup method http untuk put/delete
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

const port = 3000;

// Setup Ejs layout
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// setup database
require('./utils/db');
const Contact = require('./model/Contact');

// setup flash msg
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

// setup validator express
const { check, body, validationResult } = require('express-validator');

//konfigurasi flash msg
app.use(cookieParser('secret'));
app.use(
  expressSession({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.delete('/contact', (req, res) => {
  // res.send(req.body.nama);
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash('msg', 'Data contact berhasil dihapus!');
    res.redirect('/contact');
  });
});

// halaman index
app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layout',
    title: 'Halaman index',
  });
});

// halaman about
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  });
});

// Halaman contact
app.get('/contact', async (req, res) => {
  // Contact.find().then((contact) => {
  //   res.send(contact);
  // });

  const contacts = await Contact.find();

  res.render('contact', {
    title: 'Halaman contact',
    layout: 'layouts/main-layout',
    nama: 'Fahmy Fauzi',
    contacts,
    msg: req.flash('msg'),
  });
});

// Halaman add contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Tambah Data Kontak',
    layout: 'layouts/main-layout',
  });
});

// proses tambah data
app.post(
  '/contact',
  [
    body('nama').custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: req.params.value });
      if (duplikat) {
        throw new Error('Nama sudah terdaftar');
      }
      return true;
    }),
    check('email', ['Email tidak valid!']).isEmail(),
    check('noHp', 'No Hp tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // jika error
    if (!errors.isEmpty) {
      res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Tambah Contact',
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        req.flash('msg', 'Data berhasil ditambahkan!');
        res.redirect('/contact');
      });
    }
  }
);

//halaman edit contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render('edit-contact', {
    layout: 'layouts/main-layout',
    title: 'Edit Data Kontak',
    contact,
  });
});

// proses edit data contact
app.put(
  '/contact',
  [
    body('nama').custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });

      if (value !== req.body.oldNama && duplikat) {
        throw Error('Nama contact sudah terdaftar');
      }
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('noHp', 'No Hp tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Edit Contact',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            noHp: req.body.noHp,
          },
        }
      ).then((result) => {
        req.flash('msg', 'Data berhasil diubah');
        res.redirect('/contact');
      });
    }
  }
);

// Halaman Contact Detail
app.get('/contact/:nama', async (req, res) => {
  // Contact.findOne({ nama: req.params.nama }).then((contact) => {
  //   res.send(contact);
  // });

  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render('detail', {
    title: 'Contact Detail',
    layout: 'layouts/main-layout',
    contact,
    msg: req.flash('msg'),
  });
});

app.listen(port, () => {
  console.log(`Contact App | listen http://localhost:${port}`);
});
