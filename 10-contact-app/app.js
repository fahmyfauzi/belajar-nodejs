// console.log(process.argv);
const yargs = require('yargs');
// console.log(yargs.argv);

const contacts = require('./contacts');

// yargs.command(
//     'add',
//     'Menambahkan contact baru',
//     () => {},
//     (argv) => {
//         console.log(argv.nama);
//     }
// );
// yargs.parse();

// menambahkan contact
yargs
    .command({
        command: 'add',
        describe: 'Menambahkan contact baru',
        builder: {
            nama: {
                describe: 'Nama lengkap',
                demandOption: true,
                type: 'string',
            },
            email: {
                describe: 'Email',
                demandOption: false,
                type: 'string',
            },
            noHp: {
                describe: 'No Hp',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv) {
            // const contact = {
            //     nama: argv.nama,
            //     email: argv.email,
            //     noHp: argv.noHp,
            // };
            // console.log(contact);

            contacts.simpanContact(argv.nama, argv.email, argv.noHp);
        },
    })
    .demandCommand();

yargs.command({
    command: 'list',
    describe: 'Menampilkan semua contact nama & no hp',
    handler() {
        contacts.listContact();
    },
});

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

yargs.command({
    command: 'delete',
    describe: 'Menghapus contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});
yargs.parse();

// const contacts = require('./contacts');

// const main = async() => {
//     const nama = await contacts.tulisPertanyaan('Masukan nama anda: ');
//     const email = await contacts.tulisPertanyaan('Masukan email anda: ');
//     const noHp = await contacts.tulisPertanyaan('Masukan no hp anda: ');

//     contacts.simpanContact(nama, email, noHp);
// };

// main();