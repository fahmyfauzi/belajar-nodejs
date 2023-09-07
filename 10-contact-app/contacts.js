const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const readLine = require('readline');

// const rl = readLine.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// membuat folder data jika tidak ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//membuat file contact.js jika tidak ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// const tulisPertanyaan = (pertanyaan) => {
//     //promise
//     return new Promise((resolve, rejects) => {
//         rl.question(pertanyaan, (nama) => {
//             // callback
//             resolve(nama);
//         });
//     });
// };

const loadContact = () => {
    const file = fs.readFileSync('./data/contacts.json', 'utf-8');

    const contacts = JSON.parse(file);
    return contacts;
};

// menyimpan contact
const simpanContact = (nama, email, noHp) => {
    const contact = { nama, email, noHp };

    // const file = fs.readFileSync('./data/contacts.json', 'utf-8');

    // const contacts = JSON.parse(file);
    const contacts = loadContact();

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.bgRed.inverse.bold('Nama sudah terdaftar'));
        return false;
    }

    // cek jika email ada
    if (email) {
        // cek jika email typenya bukan email
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid'));
            return false;
        }
    }

    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red.inverse.bold('No HP tidak valid'));
        return false;
    }

    contacts.push(contact);
    // console.log(contacts);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.green.bgGreen.inverse.bold('Terimakasih sudah memasukan data'));

    // rl.close();
};

// menampilkan semua contact
const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar Kontak : '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    });
};

// menampilkan detail contact berdasarkan nama
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }
    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHp);
    if (contact.email) {
        console.log(contact.email);
    }
};

const deleteContact = (nama) => {
    const contacts = loadContact();

    //
    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    // console.log(newContact);

    // cek apakah contacts sama dengan newcontact panjangnya
    if (contacts.length === newContact.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    // berhasil
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));

    console.log(chalk.green.bgGreen.inverse.bold(`Data contact ${nama} berhasil dihapus`));
};

module.exports = {
    // tulisPertanyaan,
    simpanContact,
    listContact,
    detailContact,
    deleteContact,
};