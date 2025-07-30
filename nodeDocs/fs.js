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