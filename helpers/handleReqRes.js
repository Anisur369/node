/*
*Title: Handle Request Response
*Description: Handle Request and Response
*Author: Anisur Rahman 
*Date: 19-06-2021
*/
// module scaffolding

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const { parseJSON } = require('./utilities');

const handlers = {};

handlers.handleReqRes = (request, response) => {
  // get the url and parse it
  const parsedUrl = url.parse(request.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  const method = request.method.toLowerCase();
  // get the query string as an object
  const queryStringObject = parsedUrl.query;
  const headersObject = request.headers;
  const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };



  const decoder = new StringDecoder('utf-8');
  let realData = '';
  request.on('data', (buffer) => {
    realData += decoder.write(buffer);      
  })
  request.on('end', () => {
    realData += decoder.end();

    requestProperties.body = parseJSON(realData);

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 404;
      payload = typeof payload === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);
      // response.setHeader('Content-Type', 'application/json');
      response.writeHead(statusCode, {'Content-Type': 'application/json'});
      
      response.end(payloadString);
    });
    // response.end(realData);
  })
};


// export module
module.exports = handlers;