const fs = require('fs');
const { stringify } = require('querystring');
const readLine = require('readline');

// console.log(rl);
// core module
// ----synchronius
// try {
//     fs.writeFileSync(
//         'data/text.txt',
//         'hello world secara synchronius',
//         'utf-8'
//     );
// } catch (error) {
//     console.log(error);
// }

// const data = fs.readFileSync('data/text.txt', 'utf-8');
// console.log(data);

//  ----Asynchronius
// fs.writeFile('data/text.txt', 'hello world secara asynchronius!', (error) => {
//     console.log(error);
// });

// fs.readFile('data/text.txt', 'utf-8', (error, data) => {
//     if (error) throw error;
//     console.log(data);
// });

const rl = readLine.createInterface({
    //terminal
    input: process.stdin,
    output: process.stdout,
});

// (nama) ditampung inputan
rl.question('Masukan nama anda: ', (nama) => {
    rl.question('Masukan no hp anda: ', (noHp) => {
        // console.log(`Terimakasih ${nama} telah memasukan: ${noHp}`);
        const contact = { nama, noHp };
        const file = fs.readFileSync('data/contact.json', 'utf-8');

        // merubah file string ke json
        const contacts = JSON.parse(file);

        // tambahkan contact
        contacts.push(contact);

        //menambahkan contact ke file contact.json dengan merubah dahulu dari json ke string menggunakan JSON.stringify
        fs.writeFileSync('data/contact.json', JSON.stringify(contacts));

        console.log('Terimakasih sudah memasukan data');

        rl.close();
    });
});