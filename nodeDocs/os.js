const os = require('os');

const freeMemBytes = os.freemem();
const freeMemKB = freeMemBytes / 1024;
const freeMemMB = freeMemKB / 1024;
const freeMemGB = freeMemMB / 1024;

console.log(`Free Memory: ${freeMemKB.toFixed(2)} KB`);
console.log(`Free Memory: ${freeMemMB.toFixed(2)} MB`);
console.log(`Free Memory: ${freeMemGB.toFixed(2)} GB`);

console.log(os.cpus());
console.log(os.cpus().length);