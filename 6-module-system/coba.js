//function cetak nama
function cetakNama(nama, umur) {
    return `Hi, nama saya ${nama}, saya ${umur} tahun`;
}

// variable phi
const PI = 3.14;

// object mhs
const mahasiswa = {
    nama: 'Lia',
    umur: 23,
    cetakMahasiswa() {
        return `Hi, ${this.nama} umur kamu sekarang ${this.umur} tahun`;
    },
};

// class
class Orang {
    constructor() {
        console.log('Objek Orang telah dibuat');
    }
}

// module system
module.exports = {
    cetakNama,
    PI,
    mahasiswa,
    Orang,
};