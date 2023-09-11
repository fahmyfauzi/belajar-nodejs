const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fahmyfauzii:alvianda@cluster0.yhlihxb.mongodb.net/coba?retryWrites=true&w=majority', {
  newUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// const contact1 = new Contact({
//   nama: 'alvianda',
//   noHp: '081323242123',
//   email: 'alvianda@gmail.com',
// });

// contact1.save().then((contact) => console.log(contact));
