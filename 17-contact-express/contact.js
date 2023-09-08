const fs = require('fs');

const dirPath = './data';
// cek jika tidak ada folder data maka akan dibuatkan
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// cek jika tidak ada file contact.json maka akan dibuatkan
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// menampilkan semua contacts
const loadContact = () => {
    const file = fs.readFileSync(dataPath, 'utf-8');

    //parsing json
    const contacts = JSON.parse(file);
    return contacts;
};

const detailContact = (nama) => {
    const contacts = loadContact();

    // console.log(contacts);
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
};

module.exports = { loadContact, detailContact };