const http = require('http');
const fs = require('fs');
const port = 3000;

const renderHtml = (path, res) => {
    fs.readFile(path, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('Error: file not found!');
        } else {
            res.write(data);
        }
        res.end;
    });
};

http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        const url = req.url;

        switch (url) {
            case '/about':
                renderHtml('./about.html', res);
                break;
            case '/contact':
                renderHtml('./contact.html', res);
                break;

            default:
                renderHtml('./index.html', res);
                break;
        }

        // if (url === '/about') {
        //     // res.write('<h1>Ini adalah halaman about</h1>');
        //     // res.end();
        //     renderHtml('./about.html', res);
        // } else if (url === '/contact') {
        //     // res.write('<h1>Ini adalah halaman contact</h1>');
        //     // res.end();
        //     renderHtml('./contact.html', res);
        // } else {
        //     // res.write('Hello World');
        //     // res.end();

        //     // fs.readFile('./index.html', (error, data) => {
        //     //     if (error) {
        //     //         res.writeHead(404);
        //     //         res.write('Error: file not found!');
        //     //     } else {
        //     //         res.write(data);
        //     //     }
        //     //     res.end;
        //     // });

        //     renderHtml('./index.html', res);
    })
    .listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });