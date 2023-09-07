const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // res.send('hello world');

    // res.json({
    //     nama: 'fahmy',
    //     email: 'fahmyfauzii@gmail.com',
    // });

    res.sendFile('./index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    // res.send('hello about');
    res.sendFile('./about.html', { root: __dirname });
});

app.get('/contact', (req, res) => {
    // res.send('hello contact');
    res.sendFile('./contact.html', { root: __dirname });
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

// const http = require('http');
// const fs = require('fs');
// const port = 3000;

// const renderHtml = (path, res) => {
//     fs.readFile(path, (error, data) => {
//         if (error) {
//             res.writeHead(404);
//             res.write('Error: file not found!');
//         } else {
//             res.write(data);
//         }
//         res.end;
//     });
// };

// http
//     .createServer((req, res) => {
//         res.writeHead(200, {
//             'Content-Type': 'text/html',
//         });

//         const url = req.url;

//         switch (url) {
//             case '/about':
//                 renderHtml('./about.html', res);
//                 break;
//             case '/contact':
//                 renderHtml('./contact.html', res);
//                 break;

//             default:
//                 renderHtml('./index.html', res);
//                 break;
//         }
//     })
//     .listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//     });