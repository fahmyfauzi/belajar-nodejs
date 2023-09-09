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

// menuliskan / menimpa file contact.json dengan data baru
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// menambahkan kontak baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek duplikat nama
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama == nama);
};

// hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  //filter dan mencari data selain nama yang di hapus
  const filteredContact = contacts.filter((contact) => contact.nama != nama);

  //menyimpan nama yang sudah di filter
  saveContacts(filteredContact);
};

// ubah kontak
const updateContact = (contactBaru) => {
  const contacts = loadContact();

  // hilangkan kontak lama yang nama nya sama dengan oldName
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  // console.log(filteredContacts, contactBaru);
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = { loadContact, detailContact, addContact, cekDuplikat, deleteContact, updateContact };
