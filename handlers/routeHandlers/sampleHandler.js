/*
*Title: Sample Handler
*Description: Sample Handler
*Author: Anisur Rahman 
*Date: 19-06-2021
*/
// module scaffolding
const handler = {}

handler.sampleHandler = (requestProperties, callback) => {
  // console.log(requestProperties);
  // response.end('Sample handler is working');
  callback(200, {
    message: 'Anisur'
  });
}

module.exports = handler;