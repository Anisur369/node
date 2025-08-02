/*
*Title: Uptime Monitoring Aplication
*Description: A RESTful API to monitor up time of user defined links
*Author: Anisur Rahman 
*Date: 19-06-2021
*/

//dependencies
const http = require('http');
const url = require('url');


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
app.handlers = (request, response) => {
  // get the url and parse it
  const parsedUrl = url.parse(request.url, true);
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  const method = request.method.toLowerCase();

  // get the query string as an object
  const queryStringObject = parsedUrl.query;
  const headersObject = request.headers;
  console.log(headersObject);


  // response handler  
  response.end('Hello World');
};

// start the server
app.createServer();





// problem get method 3 bar console print working