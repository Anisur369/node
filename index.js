/*
*Title: Uptime Monitoring Aplication
*Description: A RESTful API to monitor up time of user defined links
*Author: Anisur Rahman 
*Date: 19-06-2021
*/

//dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');


// app object -module scafolding
const app = {};

// configuration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handlers);
    server.listen(app.config.port, () => {
        console.log(`Server running on http://localhost:${app.config.port}`);
    });
};

// handle Request Response
app.handlers = {};
app.handlers = handleReqRes;

// start the server
app.createServer();





// problem get method 3 bar console print working