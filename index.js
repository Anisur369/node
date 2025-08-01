// const fs = require('fs');

// const ourReadStrem = fs.createReadStream(`./text.txt`, 'utf8');
// const ourWriteStrem = fs.createWriteStream(`./output.html`);

// ourReadStrem.on('data', (chunk) => {
//   ourWriteStrem.write(chunk);  
// });

// ourReadStrem.pipe(ourWriteStrem);

const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  const readStream = fs.createReadStream('./index.html');
  readStream.pipe(res);
});
server.listen(3000);