const path = require('path');
const filePath = path.join(__dirname, './z/people..js');
console.log(__dirname);
console.log(filePath);
console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));
console.log(path.parse(filePath));