const { MongoClient, ObjectID } = require('mongodb');

// konek url
// const uri = 'mongodb://127.0.0.1:27017';
const uri = 'mongodb+srv://fahmyfauzii:alvianda@cluster0.yhlihxb.mongodb.net/?retryWrites=true&w=majority';

const dbName = 'coba';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error, result) => {
    if (error) {
        return console.log(error);
    }

    // pilih database
    const db = client.db(dbName);

    // ---menambahkan 1 data ke collection
    // db.collection('mahasiswa').insertOne({
    //         nama: 'dilan',
    //         email: 'dilanda@gmail.com',
    //     },
    //     (error, result) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log(result);
    //     }
    // );

    // ---menambahkan lebih dari satu data
    // db.collection('mahasiswa').insertMany(
    //     [{
    //             nama: 'valak',
    //             email: 'valak@gmail.com',
    //         },
    //         {
    //             nama: 'ronaldo',
    //             email: 'ronaldo7@gmail.com',
    //         },
    //     ],
    //     (error, result) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log(result);
    //     }
    // );

    // ---menampilkan data di collection mahasiswa
    // console.log(
    //     db
    //     .collection('mahasiswa')
    //     .find()
    //     .toArray((error, result) => {
    //         console.log(result);
    //     })
    // );

    // ---menampilkan data berdasarkan nama
    // console.log(
    //     db
    //     .collection('mahasiswa')
    //     .find({
    //         nama: 'dilan',
    //     })
    //     .toArray((error, result) => {
    //         console.log(result);
    //     })
    // );

    // --menampilkan data berdasarkan id
    // console.log(
    //     db
    //     .collection('mahasiswa')
    //     .find({
    //         _id: ObjectID('64fc2791899d3c15de519a65'),
    //     })
    //     .toArray((error, result) => {
    //         console.log(result);
    //     })
    // );

    // ---mengubah 1 data
    // db.collection('mahasiswa').updateOne({
    //     nama: 'lia',
    // }, {
    //     $set: {
    //         nama: 'inliya',
    //     },
    // });

    // ---mengubah berdasarkan id
    // db.collection('mahasiswa')
    //     .updateOne({
    //         _id: ObjectID('64fc2791899d3c15de519a65'),
    //     }, {
    //         $set: {
    //             email: 'dilan@gmail.com',
    //         },
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     });

    // --mengubah banyak data
    // db.collection('mahasiswa')
    //     .updateMany({
    //         nama: 'dilan',
    //     }, {
    //         $set: {
    //             nama: 'dilan ajah',
    //         },
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // ---hapus data 1
    // db.collection('mahasiswa')
    //     .deleteOne({
    //         _id: ObjectID('64fc28a060aa1c166ad42582'),
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // ---hapus lebih dari 1
    db.collection('mahasiswa')
        .deleteMany({
            nama: 'dilan ajah',
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
});