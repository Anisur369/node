/*
*Title: Uptime Monitoring Aplication
*Description: A RESTful API to monitor up time of user defined links
*Author: Anisur Rahman 
*Date: 19-06-2021
*/

//dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environments = require('./helpers/environments');
const data = require('./lib/data');



// app object -module scafolding
const app = {};

//testing file system
//@TODO: remove it later
// data.create('text', 'newFile', { name: 'Anisur' }, (err) => console.log(err));
// data.create('test', 'newFile', { name: 'Anisur' }, (err) => {
//   if (!err) {
//     console.log('File created successfully');
//   } else if (err === 'Could not create new file, it may already exist') {
//     console.log('File already exists, skipping creation');
//   } else {
//     console.log('Unexpected error:', err);
//   }
// });

//file open
// data.read('test', 'newFile', (err, data) => console.log(data));

//file update
// data.update('test', 'newFile', { name: 'Anisur', age: 22, city: 'Dhaka', country: 'Bangladesh' }, (err) => {
//   if (!err) {
//     console.log('File updated successfully');
//   }else {
//     console.log('Unexpected error:', err);
//   }
// });


//file delete
// data.delete('test', 'newFile', (err) => {
//   if (!err) {
//     console.log('File deleted successfully');
//   }else {
//     console.log('Unexpected error:', err);
//   }
// });


// configuration
// app.config = {
//     port: 3000,
// };

// create server
app.createServer = () => {
  const server = http.createServer(app.handlers);
  server.listen(environments.port, () => {
    console.log(`Server running on http://localhost:${environments.port}`);
  });
};

app.handlers = {};
// handle Request Response
app.handlers = handleReqRes;

// start the server
app.createServer();

