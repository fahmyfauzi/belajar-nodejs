// console.log('halo dunia');
const validator = require('validator');
const chalk = require('chalk');

//----npm validator
// text = validator.isEmail('fahmy@gmail.com'); //true

// phone = validator.isMobilePhone('092118418130', 'id-ID');
// number = validator.isNumeric('092118418a130');

// console.log(number);

//----npm chalk

const nama = 'Fahmy';
// console.log(chalk.blue.bgGreen.italic(`Hello ${nama}`));
const pesan = chalk `halo {green.bgBlue.bold ${nama}} fauzi {bgRed.bold.italic alvianda}`;
console.log(pesan);