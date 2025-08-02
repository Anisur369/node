/*
*Title: Not Found Handler
*Description: 404 Not Found Handler
*Author: Anisur Rahman 
*Date: 19-06-2021
*/
// module scaffolding
const handler = {}

handler.notFoundHandler = (request, callback) => {
  callback(404, {'message': 'Not Found'}); 
}

// export module
module.exports = handler;