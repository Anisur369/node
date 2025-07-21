const people = require('./people..js');
const _ = require('lodash');
const randomPerson = _.sample(people);
console.log(randomPerson);
console.log(_.last(people));
console.log(__dirname);
console.log(__filename);
console.log("======================");

const path = require('path');
const filePath = path.join(__dirname, 'people..js');
console.log(filePath);
console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));
console.log(path.parse(filePath));
console.log("======================");

const os = require('os');
console.log(os.platform());
console.log(os.homedir());
console.log(os.freemem());
console.log(os.cpus());
console.log("======================");

const fs = require('fs');
// fs.writeFileSync('./people..js', 'const people = ["sakib", "anis", "Rony"];\n\nmodule.exports = people;');
// fs.readFile('./people..js', 'utf8', (err, data) => {
  //   if (err) {
    //     console.log(err);
    //   } else {
      //     let x = data;
      //     console.log(x);
//   }
// });
let data = fs.readFileSync('./people..js');
console.log(data.toString());
console.log("======================");